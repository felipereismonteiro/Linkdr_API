import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../../components/NavBar/Navbar.js";
import Post from "../../components/Post/Post.js";
import Title from "../../components/Title/Title.js";
import PageContainer from "../../components/Container/Container.js";
import MainContent from "../../components/MainContent/MainContent.js";
import HashtagTable from "../../components/HashtagTable/HashtagTable.js";
import api from "../../services/api.js";
import { PublishingForm } from "../../components/PublishingForm/PublishingForm.js";
import SearchBarComponent from "../../components/NavBar/SearchBarComponent.js";
import { TokenContext } from "../../contexts/TokenContext.js";

export default function TimelinePage() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const { token } = useContext(TokenContext);

  useEffect(() => {
    renderPosts();
  }, [loading]);
console.log(posts)
  async function renderPosts() {
    
    try {
      const postsFound = await api.getPosts(token);
      setPosts(postsFound.data);
      setLoading(false);
    } catch (err) {
      alert(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
    }
  }

  return (
    <>
      
      <Navbar renderPosts={renderPosts}/>
      <PageContainer>
      <SearchBarContainer>
            <SearchBarComponent />
      </SearchBarContainer>
      {loading ? (
            <Loading>Loading...</Loading>
          ) :
        <>
        <MainContent>
          <Title title={"timeline"} />
          <PublishingForm renderPosts={renderPosts} />
          {posts.length === 0 ? (
            <NoPostsMessage>There are no posts yet</NoPostsMessage>
          ) : (
            posts.map((p) => <Post post={p} renderPosts={renderPosts}/>)
          )}
        </MainContent>
        <HashtagTable />
        </>
          }
      </PageContainer>
    </>
  );
}

const SearchBarContainer = styled.div`
        width: 100vw;
        height: 82px;
        position: relative;
        margin-top: 10px;
        display: none;
        background-color: #333333;
        position: fixed;
        top: 45px;
        z-index: 5;
        @media (max-width: 950px) {
            display: flex;
            justify-content: center;
            align-items: center;
        }
`

const Loading = styled.p`
  font-family: 'Oswald';
  font-weight: 700;
  font-size: 24px;
  color: #ffffff;
  text-align: center;
  margin-top: 75px;
`;

const NoPostsMessage = styled.p`
  font-weight: 700;
  font-size: 24px;
  color: #ffffff;
  text-align: center;
  margin-top: 75px;
`;
