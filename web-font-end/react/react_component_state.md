# 组件状态

2015-10-27 14:31:24 by MwumLi

---

一份简单的代码 :  

    var LikeButton = React.createClass({
      // 初始化组件状态
      getInitialState: function() {
        return {liked: false};
      },
      // 当点击时, 更改组件的状态来刷新 UI
      handleClick: function(event) {

        this.state.liked= !this.state.liked;
        this.setState(this.state);
      },
      render: function() {
        var text = this.state.liked ? 'like' : 'haven\'t liked';
        return (
          <p onClick={this.handleClick}>
            You {text} this. Click to toggle.
          </p>
        );
      }
    });

    ReactDOM.render(
      <LikeButton />,
      document.getElementById('example')
    );  

React 把组件看作一个状态机  
初始化时有一个初始状态  
一旦状态变化, 就会触发重新渲染 UI(组件的 `render()`)  

组件状态是一个 json 对象, `this.state` 属性可以访问和更改这个对象  

直接修改 `this.state` 属性来修改状态值, 并不会渲染  
只有显示调用 `this.setState()` 才会重新渲染组件  
`setState()`修改状态值并在每次调用之后自动调用 `this.render()` 方法去渲染组件    
需要注意一点 :
> `setState()` 每次需要是的所有状态值, 而我们往往某个操作只需要修改一个状态值  
> 因此可以直接修改 this.state 的值, 然后把 `this.state` 当做参数传递给 `setState`  

通常使用 `getInitialState()` 来初始化组件状态  
