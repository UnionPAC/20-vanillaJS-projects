const searchBar = document.getElementById('filter'),
    postsContainer = document.getElementById('posts-container'),
    loading = document.querySelector('.loader')


let limit = 5;
let page = 1;


// Fetch posts from API
const getPosts = async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)

    const data = await res.json();

    return data;
}

// Show posts in DOM
const showPosts = async () => {
    const posts = await getPosts();
    console.log(posts);

    posts.forEach(post => {
        const postEl = document.createElement('div');
        postEl.classList.add('post');
        postEl.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info">
            <h2 class="post-title">${post.title}</h2>
            <p class="post-content">${post.body}</p>
        </div>
        `;

        postsContainer.appendChild(postEl);
    });
}

// Show loader and fetch more posts
const showLoading = () => {
    loading.classList.add('show');

    setTimeout(() => {
        loading.classList.remove('show');

        setTimeout(() => {
            page ++;
            showPosts();
        }, 300);

    }, 1000);
}

// Filter posts by input
function filterPosts(e) {
    const input = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post')

    posts.forEach(post => {
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const content = post.querySelector('.post-content').innerText.toUpperCase();

        if (title.indexOf(input) > -1 || content.indexOf(input) > -1) {
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }

    });

}

// Show initial posts
showPosts();


// EVENT LISTENERS

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight -5) {
        showLoading();
    }
});


searchBar.addEventListener('input', filterPosts);