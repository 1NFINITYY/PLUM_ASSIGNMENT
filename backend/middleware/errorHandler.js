export function notFound(req, res, next) {
  res.status(404).json({ error: 'Not found', path: req.originalUrl });
}

export function errorHandler(err, req, res, next) {
  const status = res.statusCode >= 400 ? res.statusCode : 500;

  res.status(status).json({
    error: err.message || 'Server error',
  });
}
