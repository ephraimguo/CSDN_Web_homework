
  function createReader(cb) {
    return function(event) {
      const file = event.target.files[0];
      const fr = new FileReader();
      fr.onload = function() {
        var img = new Image();
        img.src = fr.result;
        cb(img);
      };
      fr.readAsDataURL(file);
    }
  }
