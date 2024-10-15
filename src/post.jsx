import { useEffect, useState } from 'react';
import axios from 'axios'

const Post = () => {
    const [post, setPost] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(Response => {
            setPost(Response.data);
            setSearchResults(Response.data);
        })
        .catch(error => console.error('Error fetching posts:', error))
    }, []);

    const handleSearch = () => {
        if (searchTerm.trim() === '') {
          setSearchResults(post); 
        } else {
          const filteredPosts = post.filter(post =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.body.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setSearchResults(filteredPosts);
        }
      };

      const hendleChange = event => {
        setSearchTerm(event.target.value);
      };
      
      const handleKeyPress = event => {
        if (event.key === 'Enter') {
            handleSearch();
        }
      }
    
    return (
        <div>
            <div className='searh'>
                <input type="text"
                placeholder='Search by title or body...'
                value={searchTerm}
                onChange={hendleChange}
                onKeyPress={handleKeyPress}
                 />
                 <button onClick={handleSearch}>Найти</button>
            </div>
            <ul className='post-List'>
                {searchResults.map(post => [
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                    </li>
                ])}
            </ul>
        </div>
    );
}

export default Post;
