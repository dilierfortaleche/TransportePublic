const verificarRol = (rolesPermitidos) => {
    return (req, res, next) => {
        if (!req.user || !rolesPermitidos.includes(req.user.rol)) {
            return res.status(403).json({ mensaje: 'Acceso denegado: No tienes permisos suficientes' });
        }
        next();
    };
};

module.exports = verificarRol;
