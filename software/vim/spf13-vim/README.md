# 一个跨平台 Vimrc 方案-spf13-vim

2015-10-05 03:22:06 by MwumLi

---

## 自定义配置  

1. `.vimrc.before` - spf13-vim before configuration
2. `.vimrc.before.local` - before user configuration
3. `.vimrc.bundles` - spf13-vim bundle configuration
4. `.vimrc.bundles.local` - local user bundle configuration
5. `.vimrc` - spf13-vim vim configuration
6. `.vimrc.local` - local user configuration

加载顺序就是以上的顺序  

为了保持原有 `vimrc` 文件的模块化  
我们只在 `*.local` 的文件中增添自己的东西  
按照加载次序使用我们自己的配置覆盖原有配置即可  

### .vimrc.before.local

重定义  `<leader>` :  

    let g:spf13_leader=';'


