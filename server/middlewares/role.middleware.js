module.exports = function(role) {
  return function(req, res, next) {
    if (req.method === 'OPTIONS') {
      return next()
    }

    try {
      if (role !== req.user.role) {
        return res.status(403).json({message: 'Нет доступа!'})
      }
      next()
    } catch (e) {
      res.status(401).json({message: 'Пользователь не авторизован!'})
    }
  }
}
