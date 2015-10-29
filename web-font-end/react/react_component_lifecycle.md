# 组件的声明周期

2015-10-27 16:48:56 by MwumLi

---

官方文档 : [https://facebook.github.io/react/docs/working-with-the-browser.html#component-lifecycle](https://facebook.github.io/react/docs/working-with-the-browser.html#component-lifecycle)  

组件的声明周期分成三个状态以及各状态下的方法 :

* `Mounting` : 组件已插入真实 DOM  
  * `getInitialState()` : 初始化组件状态  
  * `componentWillMount()`  
  * `componentDidMount()`  

* `Updating` : 正在被重新渲染  
  * `componentWillReceiveProps(object nextProps)` : 已加载组件收到新的参数时调用  
  * `shouldComponentUpdate(object nextProps, object nextState)` : 组件判断是否重新渲染时调用  
    假如返回 false, 则不更新  
    如果返回 true, 则更新 UI  
  * `componentWillUpdate(object nextProps, object nextState)`  
    不能在这儿调用 `this.setState()`  
  * `componentDidUpdate(object prevProps, object prevState)`  

* `Unmounting` : 组件已从真实 DOM 中移除  
  * `componentWillUnmount`  
    清理代码应该放在这儿  

上面方法中有两种特别的函数 :  
> `will` 函数在进入状态之前调用  
> `did` 函数在进入状态之后调用  

## 一份简单的代码  

    <div id="example"></div>
    <script type="text/babel">
    var i=1;
      var Hello = React.createClass({
        getInitialState: function () {
          return {
            opacity: 1.0
          };
        },

        componentDidMount: function () {
          console.log("did mount");
          this.timer = setInterval(function () {
            var opacity = this.state.opacity;
            opacity -= .05;
            if (opacity < 0.1) {
              opacity = 1.0;
            }
            this.setState({
              opacity: opacity
            });
          }.bind(this), 1000);
        },
        componentWillMount: function() {
          console.log("will mount");
        },
        componentWillUpdate: function(nextProps, nextState){
          console.log("will update");
        },
        componentDidUpdate: function(nextProps, nextState ){
          console.log("did update");
        },        
        render: function () {
          return (
            <div style={{opacity: this.state.opacity}}>
              Hello {this.props.name}
            </div>
          );
        }
      });

      ReactDOM.render(
        <Hello name="world"/>,
        document.getElementById("example")
      );
