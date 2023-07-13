import Usuario from "../models/Usuario.models.js";

export const findAll = async (req, res) => {
  try {
    let usuarios = await Usuario.findAll({
      attributes: ["id", "nombre", "apellido", "email"],
    });
    res.json({
      code: 200,
      message: "ok",
      data: usuarios
    })
  } catch (error) {
    console.log("Error findAll",error)
    res.status(500).json({
      code: 500,
      message: "Error al obtener datos de usaurios",
    })
  }
};

export const findById = async (req, res) => {
  let id = Number(req.params.id);
  try {
    if (isNaN(id)) {
      res.status(400).json({
        code: 400,
        message: "Por favor envíe un id numérico",
      })
    }
    let usuario = await Usuario.findByPk(id, {
      attributes: ["id", "nombre", "apellido", "email"],
    });
    if (!usuario) {
      res.status(404).json({
        code: 404,
        message: "Usuario no encontrado",
      })
    }
    res.json({
      code: 200,
      message: "ok",
      data: usuario
    })
  } catch (error) {
    console.log("Error findById",error)
    res.status(500).json({
      code: 500,
      message: "Error al obtener datos del usaurio con id; " + id,
    })
  }
};

export const findByEmail = async (req, res) => {
  let email = req.params.email;
  try {
    let usuario = await Usuario.findOne({ where: { email }}, 
      { attributes: ["id", "nombre", "apellido", "email"] });
    if (!usuario) {
      res.status(404).json({
        code: 404,
        message: "Usuario no encontrado",
      })
    }
    res.json({
      code: 200,
      message: "ok",
      data: usuario
    })
  } catch (error) {
    console.log("Error findByEmail",error)
    res.status(500).json({
      code: 500,
      message: "Error al obtener datos del usaurio con email; " + email,
    })
  }
};
export const addUsuario = async (req, res) => {
  try {
    let { nombre, apellido, email } = req.body;
    let nuevoUsuario = await Usuario.create({
      nombre,
      apellido,
      email
    })
    res.json({
      code: 201,
      message: "ok",
      data: nuevoUsuario
    })
  } catch (error) {
    console.log("Error addUsuario",error)
    res.status(500).json({
      code: 500,
      message: "Error al crear nuevo usaurio, erifique los datos ingresados",
    })
  }
}

export const deleteUsuario = async (req, res) => {
  let id = Number(req.params.id);
  try {
    if (isNaN(id)) {
      res.status(400).json({
        code: 400,
        message: "Por favor envíe un id numérico",
      })
    }
    let usuario = await Usuario.findByPk(id, {
      attributes: ["id", "nombre", "apellido", "email"],
    });
    if (!usuario) {
      res.status(404).json({
        code: 404,
        message: "Usuario no encontrado",
      })
    }
    await usuario.destroy();
    res.json({
      code: 200,
      message: "Usuario con id " + id + " eliminado",
    })
  } catch (error) {
    console.log("Error deleteUsuario",error)
    res.status(500).json({
      code: 500,
      message: "Error al eliminar el usaurio con id; " + id,
    })
  }
};

export const updateUsuario = async (req, res) => {
  let id = Number(req.params.id);
  try {
    if (isNaN(id)) {
      res.status(400).json({
        code: 400,
        message: "Por favor envíe un id numérico",
      })
    }
    let usuario = await Usuario.findByPk(id, {
      attributes: ["id", "nombre", "apellido", "email"],
    })

    if (!usuario) {
      res.status(404).json({
        code: 404,
        message: "Usuario no encontrado",
      })
    }

    let { nombre, apellido, email } = req.body;

    usuario.update(
      {
        nombre,
        apellido,
        email
      },
    )

    res.json({
      code: 201,
      message: "ok",
      data: usuario
    })
  } catch (error) {
    console.log("Error addUsuario",error)
    res.status(500).json({
      code: 500,
      message: "Error al intentar actualizar usaurio, erifique los datos ingresados",
    })
  }
}