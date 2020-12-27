import React, {useState, useEffect, useContext} from 'react';
import './giphy.css';
import {Container,Row,Col,Form,Button} from 'react-bootstrap'
import Pagination from "react-js-pagination";
import Loader from "../UI/loader/loader";

const Giphy = (props) => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [gighyList, setGighyList] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [total, setTotal] = useState(0);
    const [activePage, setActivePage] = useState(1);
    let limit = 12;
    const queryHandler = (event) => {
        setErrorMessage('');
        setQuery(event.target.value);
    }
    const search = (pageNumber) => {
        setLoading(true)
        setGighyList([])
        setActivePage(pageNumber)
        let offset = (pageNumber-1)*limit
        var queryURL = `http://api.giphy.com/v1/gifs/search?q=${query}&api_key=HZRCnndc90gLP7sVibsJWQWBzYXE9IRP&limit=12&offset=${offset}`;
        const abortController1 = new AbortController()
        window
            .fetch( queryURL, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Host': 'giphy.com',
                    'dataType': 'jsonp',
                    'Access-Control-Allow-Origin': '*'
                },
                method: 'GET',
                mode: 'cors',
                signal: abortController1.signal
            })
            .then(res => res.json())
            .then(responseJson => {
                console.log(responseJson.data)
                setGighyList(responseJson.data)
                setTotal(responseJson.pagination[`total_count`])
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false);
                setErrorMessage("Please try again.")
            })
        // Cancel the request if it takes more than delayFetch seconds
        setTimeout(() => abortController1.abort(), 30000)
    }
    return (
        <div className="seacrhGifsForm">
        <Container fluid="md">
            <Row>
                <Col md={{ span: 6, offset: 3}}>

                    <Form>
                        <Form.Group controlId="formBasicQuery">
                            <Form.Control type="text" placeholder="Search GIFs..." value={query} onChange={queryHandler} />
                        </Form.Group>
                        <Button variant="primary" onClick={()=>search(1)}>
                            search
                        </Button>
                        {errorMessage != "" ? <span className="error">{errorMessage}</span> : null}
                    </Form>
                </Col>
            </Row>
            <Row className="giphyList">
                    {
                        loading ?
                            <Loader/>:
                        gighyList.map((gighyItem, index) => (
                            <Col xl="3" lg="3" md="4" xs="12" className="gighyItem">
                                <a href={gighyItem.url} target="_blank">
                                    <img className="inner-image" src={gighyItem.images[`original`].url}/>
                                    <span>{gighyItem.title}</span>
                                </a>
                            </Col>
                        ))
                    }

            </Row>

            <Row>
                <Col xl="12" lg="12" md="12" xs="12">
                    {total>0?
                        <Pagination
                            activePage={activePage}
                            itemsCountPerPage={limit}
                            totalItemsCount={total}
                            pageRangeDisplayed={5}
                            onChange={search}
                        />
                        : null
                    }
                </Col>
            </Row>
        </Container>
        </div>
    )
}
export default Giphy;