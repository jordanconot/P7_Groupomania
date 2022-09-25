module.exports.uploadErrors = (err) => {
  let errors = { format: '', maxSize: '' };
  if (err.message.includes('fichier non valide'))
    errors.format = 'format incompatible';

  if (err.message.includes('max size'))
    errors.maxSize = 'Le fichier dépasse 1g';

  return errors;
};
