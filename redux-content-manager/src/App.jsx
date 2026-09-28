import PostManager from "./components/PostManager";
import PostList from "./components/PostList";

function App() {

    return (
        <div>

            <h1>Redux Content Manager</h1>

            <PostManager />

            <hr />

            <PostList />

        </div>
    );
}

export default App;