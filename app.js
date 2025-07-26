const Button = ({text, onClick, className}) => {
    return (
        <button className={`button ${className}`} onClick={onClick}>
            {text}
            </button>
    );
};

const Header = () => {
    return (
        <header className="header">
            <h1>Eflex Code</h1>
            <nav className="nav-links">
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#services">Services</a>
                <a href="#contact">Contact</a>
            </nav>
            <div>
                <Button text="Get Started" className="button-primary" onClick={() =>
                    alert('Get Started clicked')} />
                <Button text="Login" className="button-secondary" onClick={() =>
                    alert('Login clicked')} />
            </div>
        </header>
    );
};

const UserInput = ({ addPost }) => {
    const [name, setName] = React.useState('');
    const [quote, setQuote] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !quote.trim()) {
            alert('Please fill in both fields');
            return;
        }
        
        const initials = name.split(' ').map(word => word[0]).join('').toUpperCase();
        const postData = {
            id: Date.now(),
            name,
            initials,
            quote,
            date: new Date().toLocaleString()
        };

        addPost(postData);
        setName('');
        setQuote('');
    };

    return (
        <form className="input-form" onSubmit={handleSubmit}>
            <input
            className="input-field"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e)=> setName(e.target.value)}
            />
            <textarea
            className="input-field"
            placeholder="Your Quote"
            value={quote}
            onChange={(e)=> setQuote(e.target.value)}
            />
            <Button text="Submit Quote" className="button-primary" />
        </form>
    );
};

const PostCard = ({ post }) => {
    return (
        <div className="post-card">
            <div className="initials-circle">{post.initials}</div>
            <div>
                <h3>{post.name}</h3>
                <p>{post.quote}</p>
                <small>{post.date}</small>
            </div>
        </div>
    );
};

const App =() => {
    const [posts, setPosts] = React.useState(JSON.parse(localStorage.getItem('posts'))
|| []);
    React.useEffect(() => {
        localStorage.setItem('posts', JSON.stringify(posts));
    }, [posts]);
    
    const addPost = (postData) => {
        setPosts([postData, ...posts]);
    };

    return (
        <div className="container">
            <Header />
            <UserInput addPost={addPost} />
            <div>
                {posts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);