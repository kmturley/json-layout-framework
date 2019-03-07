var JsonLayout = function () {
  var module = {
    init: function(options) {
      var me = this;
      this.options = options;
      this.el = document.getElementById(this.options.id);
      console.log('init', this);
      this.loadJson(options.path, function (data) {
        console.log('load', data);
        me.pages = data.pages;
        me.checkHash();
      });
      window.addEventListener('hashchange', function() {
        me.checkHash();
      });
    },
    checkHash: function() {
      console.log('checkHash', window.location.hash.slice(2));
      this.currentPage = window.location.hash.slice(2);
      this.showPage(this.currentPage);
    },
    createLayer: function(layer, parent) {
      var el = document.createElement(layer.type);
      if (layer.href) {
        el.setAttribute('href', layer.href);
      }
      if (layer.innerHTML) {
        el.innerHTML = layer.innerHTML;
      }
      Object.assign(el.style, layer.style);
      parent.appendChild(el);
      return el;
    },
    loadJson: function(url, callback) {
      var request = new XMLHttpRequest();
      request.onreadystatechange = function() { 
        if (request.readyState == 4 && request.status == 200) {
          callback(JSON.parse(request.responseText));
        }
      }
      request.open('GET', url, true);
      request.send(null);
    },
    showPage: function (slug) {
      var me = this;
      this.pages.forEach(function(page) {
        if (slug === page.slug) {
          me.el.innerHTML = '';
          page.layers.forEach(function(layer) {
            me.createLayer(layer, me.el);
          });
        }
      });
    }
  };
  return module;
};
