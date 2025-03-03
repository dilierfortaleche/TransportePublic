const jwt = require('jsonwebtoken');

const middlewareAutenticacion = (req, res, next) => {
    try {
        // Obtener token del header Authorization o de una cookie
        const authHeader = req.headers['authorization'];
        const token = authHeader ? authHeader.split(' ')[1] : req.cookies?.token;

        if (!token) {
            return res.status(403).json({ mensaje: 'Acceso denegado: Token no proporcionado' });
        } qeqeqqew

        // Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next(); // Pasar al siguiente middleware/controlador
    } catch (error) {
        return res.status(401).json({ mensaje: 'Token inválido o expirado', error: error.message });
    }
};

ficarRol = (rolesPermitidos) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ mensaje: 'No autenticado' });
        }
        if (!rolesPermitidos.includes(req.user.rol)) {
            return res.status(403).json({ mensaje: 'Acceso denegado: No tienes permisos suficientes' });
        }
        next();
    };
};

module.exports = middlewareAutenticacion;
