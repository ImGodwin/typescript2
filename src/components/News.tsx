import { Component, useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

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

const News = () => {
  const params = useParams();

  const [newsReport, setNewsReport] = useState<ArrObj[]>([]);

  const fetchNewsReport = async () => {
    try {
      const resp = await fetch(`https://api.spaceflightnewsapi.net/v4/articles/${params.id}`);

      if (resp.ok) {
        const articlesToPrint = await resp.json();
        console.log(articlesToPrint);
        setNewsReport(articlesToPrint.results);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNewsReport();
  }, []);
  return (
    <Component>
      <Link to="/">
        <Button>Back to homepage</Button>
      </Link>
      {newsReport && (
        <Row>
          {newsReport.map((story) => (
            <Col md={4} lg={3} key={story.id}>
              <Card className="my-5 mx-5">
                <Card.Img variant="top" src={story.image_url} />
                <Card.Body>
                  <Card.Title>{story.title}</Card.Title>
                  <Card.Text>{story.summary}</Card.Text>
                  <p className="text-danger">{story.news_site}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Component>
  );
};

export default News;
