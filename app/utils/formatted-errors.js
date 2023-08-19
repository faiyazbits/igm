export default function formattedErrors(errorMessages) {
  console.log(errorMessages, 'errorMessageserrorMessages');
  const errors = errorMessages.errors.map((error) => {
    // extract attribute from source pointer
    // details here http://jsonapi.org/format/#error-objects
    const attributePath = error.source.pointer.split('/');
    const attribute = attributePath[attributePath.length - 1];
    const formattedAttribute = attribute.replace(/([a-z])([A-Z])|_/g, '$1 $2').toLowerCase();
    return `${formattedAttribute} ${error.detail}`;
  });

  return `Error: ${errors.join(', ')}`;
}
