// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"epB2":[function(require,module,exports) {


var xx = window.localStorage.getItem('x');
var xxObject = JSON.parse(xx);

var hashMap = xxObject || [{ logo: 'A', url: 'https://www.acfun.cn' }, { logo: 'B', url: 'https://www.bilibili.com' }, { logo: 'D', url: 'https://developer.mozilla.org/zh-CN/' }, { logo: 'Z', url: 'https://www.zhihu.com' }, { logo: 'G', url: 'https://www.google.com' }, { logo: 'W', url: 'https://www.w3school.com.cn/' }, { logo: 'F', url: 'https://www.figma.com/' }, { logo: 'F', url: 'https://excalidraw.com/' }];

var simplifyUrl = function simplifyUrl(url) {
   return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, ''); //用了正则表达式  将/开头的所有内容  替换成空字符串''     
};

var render = function render() {
   $('li:not(.last)').remove(); //重要步骤，除了<li class='last'>不删 其他所有li都删除
   hashMap.forEach(function (node, index) {
      var $li = $('<li>\n    <div class="site">\n      <div class="logo">' + node.logo + '</div>\n      <div class="link">' + simplifyUrl(node.url) + '</div>\n      <div class=\'close\'>\n      <svg class="iconpark-icon"><use href="#close-small"></use></svg>\n    </div>\n    </div>\n  </li>').insertBefore($('li.last'));

      $li.on('click', function () {
         window.open(node.url);
      }); //替代a标签 这里肯定用了重载 因为第二个参数是箭头函数了
      $li.on('click', '.close', function (e) {
         e.stopPropagation();
         console.log(index);
         hashMap.splice(index, 1);
         render();
      });
   });
};
render();

$(".addButton").on('click', function () {
   var url = window.prompt('请问您需要新增什么网址');
   if (url.indexOf('http') === -1) {
      url = 'https://' + url;
   }
   console.log(url);
   hashMap.push({
      logo: simplifyUrl(url)[0].toUpperCase(),
      url: url
   });
   $('li:not(.last)').remove(); //重要步骤，除了<li class='last'>不删 其他所有li都删除
   render(); //把用户写的url 生成对应的<li>....</li> 并且这个li 要放到<li class='last'>前面
});

window.onbeforeunload = function () {
   var string = JSON.stringify(hashMap);
   window.localStorage.setItem('x', string);
};

$(document).on('keypress', function (e) {
   var key = e.key;
   for (var i = 0; i < hashMap.length; i++) {
      if (hashMap[i].logo.toLowerCase() === key) {
         window.open(hashMap[i].url);
      }
   }
});

$('.input').on('keypress', function (e) {
   e.stopPropagation();
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.6870480e.map