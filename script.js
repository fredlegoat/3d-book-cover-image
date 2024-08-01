let books = document.querySelectorAll('.book');
for (let book of books) {
    let pages = book.getElementsByClassName('bookpage');
    let size = pages.length;
    for (let i = 0, page; page = pages[i]; ++i) {
        if (i % 2 === 0) page.style.zIndex = (size - i);
    }
    book.onclick = function(e) {
        if (e.target == e.currentTarget) { // unroll book in mobile mode
            e.target.classList.toggle('unrolled');
        } else {
            let clickedElement = e.target.closest('.bookpage');
            if (!clickedElement) return;

            e.currentTarget.classList.remove('unrolled');
            let pagearray = [...clickedElement.parentElement.children];
            let pagenum = pagearray.indexOf(clickedElement);
            clickedElement.classList.remove('clickable');
            if (pagenum & 1) { // odd pages (flip back)
                clickedElement.classList.remove('flipped');
                clickedElement.previousElementSibling.classList.remove('flipped');
                clickedElement.nextElementSibling.classList.remove('clickable');
                if (pagenum > 1) {
                    clickedElement.previousElementSibling.classList.add('clickable');             
                    clickedElement.previousElementSibling.previousElementSibling.classList.add('clickable');
                } else {
                    clickedElement.parentElement.classList.remove('opened');
                }
            } else if (pagenum === (pagearray.length-1)) { // last page (close book)
                for (let i = pagenum; i >= 0; --i) {
                    pagearray[i].classList.remove('flipped');
                }
                clickedElement.parentElement.classList.remove('opened');                  
            } else { // even pages (flip forward)
                if (pagenum === 0) { // first page (open book)
                    clickedElement.parentElement.classList.add('opened');
                } else {
                    clickedElement.previousElementSibling.classList.remove('clickable');
                }
                clickedElement.classList.add('flipped');
                clickedElement.nextElementSibling.classList.add('flipped');
                clickedElement.nextElementSibling.classList.add('clickable');              
                clickedElement.nextElementSibling.nextElementSibling.classList.add('clickable');
            }
        }
        e.stopPropagation();
    }
}