import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';

export interface ArrObj {
  id: number;
  title: string;
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: Date;
  updated_at: Date;
  featured: boolean;
  launches: any[];
  events: any[];
}

const MainPage = () => {
  const [articles, setarticles] = useState<ArrObj[]>([]);

  const fetchArticles = async () => {
    try {
      const resp = await fetch('https://api.spaceflightnewsapi.net/v4/articles');

      if (resp.ok) {
        const articlesToPrint = await resp.json();
        //console.log(articlesToPrint);
        setarticles(articlesToPrint.results);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <Container>
      {articles && (
        <Row>
          {articles.map((story) => (
            <Col md={4} lg={3} key={story.id}>
              <Card className="my-5 mx-5">
                <Card.Img variant="top" src={story.image_url} />
                <Card.Body>
                  <Card.Title>{story.title}</Card.Title>
                  <Card.Text>{story.summary}</Card.Text>
                  <p className="text-danger">{story.news_site}</p>

                  <Link to={`${story.id} click here`}>
                    <Button variant="primary">Keep reading</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default MainPage;
