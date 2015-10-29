# 表单与事件

2015-10-27 16:30:27 by MwumLi

---

一个简单的代码 :  

    <div id="example"></div>
    <script type="text/label">
    var Input = React.createClass({
      getInitialState: function() {
        return {value: 'Hello!'};
      },
      handleChange: function(event) {
        this.setState({value: event.target.value});
      },
      render: function () {
        var value = this.state.value;
        return (
          <div>
            <input type="text" value={value} onChange={this.handleChange} />
            <p>{value}</p>
          </div>
        );
      }
    });
    ReactDOM.render(<Input/>, document.body);
    </script>


组件中会有一些表单 UI, 例如 `<input>`、`<textarea>` 和 `<option>`   
它们的值根据用户和组件的互动而改变  

在组件中只能通过事件来实现对于其值改变进行某些响应  

对于 `<input>`, `<textarea>`, and `<option>` 都可以设置 `onChange` 事件的回调函数来相应其值的变化  

[form-官方文档](http://facebook.github.io/react/docs/forms.html)  
[events-官方文档](http://facebook.github.io/react/docs/events.html)  
