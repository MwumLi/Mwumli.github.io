# 组件属性

2015-10-27 14:31:24 by MwumLi

---

每一个组件是有属性的, 用来显示组件的某些特性  
通过 `this.props.[propName]`来访问  

对于 React 来说, 组件属性是只读的  
因此, 只能在实例化组件类的时候**添加属性**  
或设定[默认的属性值](http://facebook.github.io/react/docs/reusable-components.html#default-prop-values)(`getDefaultProps()`)  

添加组件属性的时候, 需要注意的是 js 的保留字不能用于命名为属性名  
比如 `class` 属性需要写成 `className`, `for` 属性需要写成 `htmlFor`  

`this.props` 对象的属性与组件的属性一一对应  
但是有个例外, 那就是 `this.props.children` 属性表示组件的所有子节点  
如果子节点多余 1 个时, `this.props.children` 才是一个数组  

我们可以在组件类中通过 `propTypes` 属性来对组件的属性进行验证限制  
如果不符合要求, web 页面上或许没有什么明显的提示, 但是有错误将出现在控制台   
[更多](http://facebook.github.io/react/docs/reusable-components.html#prop-validation)  



    <div id="example1"></div>
    <div id="example2"></div>
    <div id="example3"></div>
    <script type="text/babel">
    var NotesList = React.createClass({
     propTypes: {
       title: React.PropTypes.string.isRequired,
     },
     getDefaultProps : function () {
       return {
         title : 'type is string and require'
       };
     },
     render: function() {
       return (
         <div>
            <h3>{this.props.title}</h3>
            <ol>
            {
              this.props.children.map(function (child) {
                return <li>{child}</li>
              })
            }
            </ol>
         </div>
       );
     }
    });

    // 添加自定义属性 title
    ReactDOM.render(
     <NotesList title="Show Children">
       <span>hello</span>
       <span>world</span>
     </NotesList>,
     document.getElementById("example1")
    );

    // 属性要求一个字符串, 却赋给属性一个数字
    var data=23;
    ReactDOM.render(
     <NotesList title={data} >
       <span>some</span>
       <span>other</span>
     </NotesList>,
     document.getElementById("example2")
    );

    //没有指定属性, 使用属性的默认值
    ReactDOM.render(
     <NotesList>
       <span>one</span>
       <span>two</span>
     </NotesList>,
     document.getElementById("example3")
    );

    </script>
