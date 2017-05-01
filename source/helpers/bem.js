const bem = (block, element = '', modifier = '') => {
  if (element.length === 0) {
    return block;
  } else if (element.length > 0 && modifier.length === 0) {
    return `${block}__${element}`;
  }
  return `${block}__${element}_${modifier}`;
};

export default bem;
