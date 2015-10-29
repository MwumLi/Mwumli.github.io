# ReactDOM与渲染组件

2015-10-27 11:41:18 by MwumLi

---

React 中有一个概念叫 virtual DOM  
它就是组件. 不是真实的 DOM 节点, 而是存在于内存之中的一种数据结构  

根据 React 的设计, 所有 DOM 的变动, 都先在虚拟 DOM 上发生, 这就是所谓的整体刷新  
然后再将实际发生变动的部分, 反应在真实 DOM 上，采用的是 [DOM diff](http://calendar.perfplanet.com/2013/diff/) 算法  


React 使用 `ReactDOM` 这个全局对象来对 virtual DOM 进行操纵  

`ReactDOM.render()` 是其中最基础也是最重要的方法  
用于将模板转为 HTML 语言，并插入指定的 DOM 节点  

## ReactDOM的一些方法  

1. `render(element, container, [function callback])`  
   用于实例化组件并插入指定容器节点并初次渲染  

        ReactDOM.render(
          <h1>Hello, world!</h1>,
          document.getElementById('example'),
          function(){
            console.log("hellowrold for react");
          }
        )

  [官方文档](http://facebook.github.io/react/docs/top-level-api.html#reactdom.render)  

2. `findDOMNode`  
   从组件中获取真实的 DOM 节点  

        var MyComponent = React.createClass({
          handleClick: function() {
            ReactDOM.findDOMNode(this.refs.myTextInput).focus();
          },
          render: function() {
            return (
              <div>
                <input type="text" ref="myTextInput" />
                <input type="button" value="Focus the text input" onClick={this.handleClick} />
              </div>
            );
          }
        });

        ReactDOM.render(
          <MyComponent />,
          document.getElementById('example')
        );

  可以看到要获取组件中的某个子节点的真实 DOM , 需要在要获取的 node 上有一个 `ref` 属性  
  然后 `this.refs.[refValue]` 就指向这个虚拟 DOm 的子节点  
  最后通过 `React.findDOMNode()` 方法获取真实的 DOM 节点  
