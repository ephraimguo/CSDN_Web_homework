window.onload = function(){
    // caculating
    var albumNameArr = ['default'];
    var albumPhotoList = {
        'default':[]
    };
    function albumAdding(alb){
        albumNameArr.push(alb);
        albumPhotoList[alb] = [];
    }
    function photoAdding(alb, photo){
        albumPhotoList[alb].push(photo);
    }

    // display setting
    var albumTitle = document.querySelector('.album-title');        //album title displayed at the title bar
    var albumList = document.querySelector('.album-list');          //album list contains all the albumLi containing album link
    var photoList = document.querySelector('.photo-list');          //photo list containing all the photos
    // button of actions
    var btnCreateAlbum = document.querySelector('div.button-grp>form>input[type="button"]');        // creating new album button
    var btnAddPhoto = document.querySelector('#add-file');                                          // adding new photo button

    //page number nav
    var pageNav = document.querySelector('nav>ul');     //container of page link

    var currentAlbum = 'default';       // initiate current album as default
    var currentPage = 1;                // initiate current page as 1
    var photoPerPage = 3;               // assign the photos per page

    // add event listener for creating new album button
    btnCreateAlbum.addEventListener('click', function(ev){
        const dummy = document.querySelector('#dummy');
        // let dummy.value =  window.prompt('Album Name');
        let albumName = window.prompt('Album Name');
        albumAdding(albumName);
        renderAlbumList();
    });

    // add event listen for add photo button
    btnAddPhoto.onchange = function(ev) {
        const file = btnAddPhoto.files[0];
        const fr = new FileReader();
        btnAddPhoto.value = '';
        fr.onload = function() {
            let img = new Image();
            img.src = fr.result;
            uploadPhoto(img);
        };
        fr.readAsDataURL(file);
    };

    //render photo list, to display the chosen album photos
    function renderPhotoList(){
        photoList.innerHTML = "";
        let currentImg = [];
        for(let i=(currentPage-1)*photoPerPage; i<(currentPage)*photoPerPage; i++){
            if(albumPhotoList[currentAlbum] && albumPhotoList[currentAlbum][i]!==undefined && albumPhotoList[currentAlbum][i]!==null){
                currentImg.push(albumPhotoList[currentAlbum][i]);
            }
            else{
                console.log('no enough pic');
            }
        }

        currentImg.forEach(cPh=>{
            let photo = document.createElement('div');
            let button = document.createElement('button');
            button.innerText = "X";

            button.addEventListener('click', function(ev){
                // albumPhotoList[currentAlbum].splice(cPh,1)
                if(currentImg.length>1){
                    let index = albumPhotoList[currentAlbum].indexOf(cPh);
                    albumPhotoList[currentAlbum].splice(index, 1);
                    pagination();
                    renderPhotoList();
                }
                else{
                    currentPage -= 1;
                    let index = albumPhotoList[currentAlbum].indexOf(cPh);
                    albumPhotoList[currentAlbum].splice(index, 1);
                    pagination();
                    renderPhotoList();
                }

            });
            photo.className = "photo";
            photo.appendChild(cPh);
            photo.appendChild(button);
            photoList.appendChild(photo);
        });
    }

    //render album list, to display the chosen album and add event to album link
    function renderAlbumList(){
        albumList.innerHTML = '';
        albumNameArr.forEach(albName=>{
            let album = document.createElement("li");
            album.className = "album";

            let albumLink = document.createElement("a");
            albumLink.className = "album-link";

            let btnDelAlbum = document.createElement("button");
            btnDelAlbum.className = "btn-del-album";
            btnDelAlbum.innerText = "X";

            // add event listener to album link before inserting the a tag to <li>
            albumLink.addEventListener('click', function(ev){
                currentPage = 1;
                currentAlbum = albName;
                renderPhotoList();
                pagination();
                albumTitle.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;" + `${currentAlbum}`;
            });

            btnDelAlbum.addEventListener('click', function(ev){
                let name = btnDelAlbum.previousElementSibling.innerHTML;
                console.log(name);
                let index = albumNameArr.indexOf(name);
                albumNameArr.splice(index, 1);
                delete albumPhotoList[name];
                albumTitle.innerHTML = "";
                currentAlbum = albumNameArr[0]?albumNameArr[0]: currentAlbum="";
                currentPage = 1;
                renderPhotoList();
                // currentAlbum = albumNameArr[0]?albumNameArr[0]: alert('No Album Yet');
                renderAlbumList();
            });

            albumLink.innerHTML = albName;
            albumLink.href = "#";

            album.appendChild(albumLink);
            album.appendChild(btnDelAlbum);
            albumList.appendChild(album);
        });
    }

    // upload photo to album photo list[] and render the photo list
    function uploadPhoto(photo){
        photoAdding(currentAlbum, photo);
        pagination();
        renderPhotoList();
    }

    // adding pagination at the buttom part
    function pagination(){
        pageNav.innerHTML = "";
        let pageNavFirstLink = document.createElement('a');
        let pageNavLastLink = document.createElement('a');
        let pageNavFirst = document.createElement('li');
        let pageNavLast = document.createElement('li');

        pageNavFirstLink.innerHTML = 'First';
        pageNavLastLink.innerHTML = 'Last';

        // pageNav.innerHTML = `<li><a>First</a></li>`;
        // let pageNavLast = `
        // <li><a>Last</a></li>
        // `;
        let length = albumPhotoList[currentAlbum].length;

        pageNavFirstLink.addEventListener('click', function(ev){
            currentPage = 1;
            renderPhotoList();
        });
        pageNavLastLink.addEventListener('click', function(ev){
            currentPage = length/photoPerPage>0?Math.ceil(length/photoPerPage):1;
            console.log(currentPage);
            renderPhotoList();
        });

        pageNavFirst.appendChild(pageNavFirstLink);
        pageNavLast.appendChild(pageNavLastLink);
        pageNav.appendChild(pageNavFirst);

        for(let i = 0; i<length/photoPerPage; i++){
            let pageNavLink = document.createElement('a');
            let pageNavLi = document.createElement('li');
            pageNavLink.innerText = `${i+1}`;
            pageNavLink.onclick = function(){
                currentPage = i+1;
                renderPhotoList();
            };
            pageNavLi.appendChild(pageNavLink);
            pageNav.appendChild(pageNavLi);
        }
        pageNav.appendChild(pageNavLast)

    }
    renderAlbumList();
};






























