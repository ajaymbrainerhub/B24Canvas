const elementsOnDesign = (state, designId, copy = false) => {
  // TODO: разобраться почему данные по разному приходят
  const design = state.entities.designs[designId] || state.entities.designs.find(design => design.id === designId)
  const map = design.elements.map(eleId => {
    // TODO: не должно так работать, понять почему нет данных в elements при редактировании
    const element = state?.entities?.elements.hasOwnProperty(eleId) ? { ...state.entities.elements[eleId] } : eleId

    // if (element) {
    //   switch (element.elementableType) {
    //     case 'Shape':
    //       element.elementableAttributes = state.entities.shapes[element.elementableId];
    //       break;
    //     case 'Text':
    //       element.elementableAttributes = state.entities.text[element.elementableId];
    //       break;
    //     default:
    //       break;
    //   }
    //   if (copy) {
    //     delete element.id;
    //     delete element.elementableId;
    //     delete element.elementableAttributes.id;
    //   }
    // }
    if (!element.id) {
      element.id = `temp-${Math.ceil(Date.now() + Math.random() * 1000)}`
    }
    return element
  })
  return map.filter(el => Object.keys(el) !== 0)
  // return map;
}

export default elementsOnDesign
