import Users from "../model/UserModel.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll();

    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

export const Register = async (req, res) => {
  const { name, email, password, confPassword } = req.body;

  const cekEmail = await Users.findAll({
    where: { email: email },
  });
  // console.log(cekEmail);

  if (email == cekEmail[0]?.email)
    return res.status(404).json({ msg: "Akun sudah terdaftar!" });

  if (password !== confPassword)
    return res.status(400).json({ msg: "Password tidak sama!" });

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  const role = "user";

  try {
    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role,
    });

    res.json({ msg: "Register berhasil!" });
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await Users.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    await Users.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json("msg: User deleted succesfully!");
  } catch (error) {
    console.log(error.message);
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: { email: req.body.email },
    });

    const match = await bcrypt.compare(req.body.password, user[0].password);

    if (!match) return res.status(400).json({ msg: "Password anda salah!" });

    const userId = user[0].id;
    const name = user[0].name;
    const email = user[0].email;
    const role = user[0].role;

    const accessToken = jsonwebtoken.sign(
      { userId, name, email, role },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "3600s",
      }
    );

    // membuat refresh token
    const refreshToken = jsonwebtoken.sign(
      { userId, name, email, role },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // update refresh token db
    await Users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );

    // setting refresh token pada cookie
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    // kirim response ke client access token
    res.json({ accessToken });
  } catch (error) {
    res.status(404).json({ msg: "Akun anda tidak ditemukan!" });
  }
};
