window.consumeElement = (function () {

  var createChildren = function (children) {
    return children.map(function (child, i) {
      var text;
      if (child.children.length === 0) {
        text = child.text;
      }
      return React.createElement(
        child.tagName,
        {
          key: i
        },
        createChildren(child.children),
        text
      );
    });
  };

  var MyElement = React.createClass({
    render: function () {
      var text;
      if (this.props.children.length === 0) {
        text = this.props.text;
      }
      var children = createChildren(this.props.children);
      return React.createElement(
        this.props.tagName,
        null,
        children,
        text
      );
    }
  });

  var getStructureOfMyElement = function (target) {
    var getStructureOfNode = function (node) {
      var children = Array.prototype.map.call(node.children, function (child) {
        return getStructureOfNode(child);
      });
      var text;
      if (node.children.length === 0) {
        text = node.innerText;
      }
      return {
        tagName: node.tagName,
        text: text,
        children: children
      };
    };
    return getStructureOfNode(target);
  };

  return function (target) {
    var tableStructure = getStructureOfMyElement(target);

    renderMyElement = function () {
      React.render(React.createElement(
        MyElement,
        tableStructure
      ), target);
    };
    renderMyElement();
  };
})();
