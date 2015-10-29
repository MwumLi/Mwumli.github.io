# 组件的 style 属性不是字符串

2015-10-27 17:28:56 by MwumLi

---

组件的 style 属性是一个对象, 不能在 jsx 中使用 字符串来作为 style 属性的值  

    <div id="example"></div>
    <script type="text/babel">
        var Hello = React.createClass({
            render : function() {
                return (
                    <div style={{color: "red"}}>
                        Hello,Wolrd
                    </div>
                );
            }
        });

        ReactDOM.render(
            <Hello />,
            document.getElementById("example")
        )
    </script>

`style={{color: "red"}}` 的第一宠大括号表示这是 js 语法, 第二重大括号表示样式对象  
