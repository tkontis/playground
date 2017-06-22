function stringify(stringifiable) {
    if (typeof(stringifiable) === 'string') {
      return stringifiable;
    } 
    else if (Array.isArray(stringifiable)) {
      return stringifiable.map(element => stringify(element)).join(', ');
    }
    else if (typeof(stringifiable) === 'object') {
      return Object.keys(stringifiable)
        .map(key => `[${key}]=>[${stringify(stringifiable[key])}]`).join(', ');
    }
    return String(stringifiable).toString();
}