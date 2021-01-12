const Rafeact = (function () {
  function createElement(type, attributes = {}, ...children) {
    const childElements = [].concat(...children).reduce((acc, child) => {
      if (child != null && child !== true && child !== false) {
        if (child instanceof Object) {
          acc.push(child);
        } else {
          acc.push(createElement('text', { textContent: child }));
        }
      }
      return acc;
    }, []);
    return {
      type,
      children: childElements,
      props: Object.assign({ children: childElements }, attributes),
    };
  }

  const render = function (vdom, container, oldDom = container.firstChild) {
    if (!oldDom) {
      mountElement(vdom, container, oldDom);
    }
  };

  const mountElement = function (vdom, container, oldDom) {
    // Native elements as well as functions
    return mountSimpleNode(vdom, container, oldDom);
  };

  const mountSimpleNode = function (
    vdom,
    container,
    oldDomElement,
    parentComponent
  ) {
    let newDomElement = null;
    const nextSibling = oldDomElement && oldDomElement.nextSibling;

    if (vdom.type === 'text') {
      newDomElement = document.createTextNode(vdom.props.textContent);
    } else {
      newDomElement = document.createElement(vdom.type);
    }

    // Setting reference to  vdom to dom
    newDomElement._virtualElemet = vdom;
    if (nextSibling) {
      container.insertBefore(newDomElement, nextSibling);
    } else {
      container.appendChild(newDomElement);
    }

    // Todo: render children
    vdom.children.forEach((child) => {
      mountElement(child, newDomElement);
    });
  };

  return {
    createElement,
    render,
  };
})();
