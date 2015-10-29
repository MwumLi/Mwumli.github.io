# 组件

2015-10-27 14:31:24 by MwumLi

---

React 允许将代码封装成组件(component), 然后像普通 HTML 标签一样可以直接插入到网页中  

`React.creatClass()` 用于生成一个组件类  
而实例化一个组件类就生成了一个组件  

每一个组件都一个 `render()` 方法在第一个实例以及组件状态改变的时候调用来渲染组件  


    var HelloMessage = React.createClass({
      render: function() {
        return <h1>Hello {this.props.name}</h1>;
      }
    });

    ReactDOM.render(
      <HelloMessage name="John" />,
      document.getElementById('example')
    );

变量 `HelloMessage` 就是一个组件类  
模板插入 `<HelloMessage />` 时, 会自动生成一个 `HelloMessage` 实例, 即组件  

`name` 是我们自己为组件添加的属性  
