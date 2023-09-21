import { Component, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

interface ArrObj {
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

  const [newsReport, setNewsReport] = useState<ArrObj | null>(null);

  const fetchNewsReport = async () => {
    try {
      const resp = await fetch(`https://api.spaceflightnewsapi.net/v4/articles/${params.id}`);

      if (resp.ok) {
        const articlesToPrint = await resp.json();
        console.log(articlesToPrint);
        setNewsReport(articlesToPrint);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNewsReport();
  }, []);

  return (
    <Container>
      <Link to="/">
        <Button>Back to homepage</Button>
      </Link>
      {newsReport && (
        <Row>
          <Col md={4} lg={3}>
            <Card className="my-5 mx-5">
              <Card.Img variant="top" src={newsReport.image_url} />
              <Card.Body>
                <Card.Title>{newsReport.title}</Card.Title>
                <Card.Text>{newsReport.summary}</Card.Text>
                <p className="text-danger">{newsReport.news_site}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default News;
