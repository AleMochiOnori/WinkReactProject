import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import './MainComponent.css';
import SearchBarComponent from './SearchBarComponent';
import './react-paginate-custom.css';
import ReactPaginate from 'react-paginate';
import DropdownMenu from './DropdownMenu';
import { Link } from 'react-router-dom';




interface BooksApiResponse {
    kind: string;
    totalItems: number;
    items: Item[];
}

interface Item {
    kind : string
    id : string,
    etag: string,
    selfLink : string,
    volumeInfo: VolumeInfo
    saleInfo : {
        buyLink : string
    }
}

interface VolumeInfo {
   title : string,
   authors : string[],
   publisher : string,
   publishedDate : string,
   description : string,
   imageLinks: {
       smallThumbnail: string,
       thumbnail: string
   },
   
}

    

const MainComponent = () => {
    const [books, setBooks] = useState<BooksApiResponse | null>(null); // Stato per memorizzare la risposta
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('book');


    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&startIndex=${(currentPage - 1 ) * postPerPage}&maxResults=${postPerPage}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Errore di rete o del server');
                }
                return response.json();
            })
            .then(data => {
                setBooks(data); // Imposta direttamente i dati ricevuti
            })
            .catch(error => {
                console.error('Errore:', error);
                setError(error.message);
            });
    }, [currentPage, postPerPage, searchTerm]);

    function filterTerm(term: string) {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${term || 'book'}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Errore di rete o del server');
                }
                return response.json();
            })
            .then(data => {
                setBooks(data); 
                setCurrentPage(1); 
            })
            .catch(error => {

                console.error('Errore:', error);
                setError(error.message);
            });
            setSearchTerm(term || 'book');
            setCurrentPage(1);
    }

    if (error) {
        return <div className="error">Errore: {error}</div>;
    }

    if (!books) {
        return <div>Caricamento...</div>;
    }
  
  
 
    const pageCount = Math.min(30, Math.ceil(300 / postPerPage));

   

    return (
        <>
        <div className='menuContainer'>
            <SearchBarComponent setSearchTerm={filterTerm}/>
            <DropdownMenu value={postPerPage} onSelect={(val) => { setPostPerPage(val); setCurrentPage(1); }} />
        </div>
        <div className='mainContainer'>
            {books.items && books.items.map((item) => (
                <Card className='cardStyle' key={item.id}>
                    <Card.Img className='imgStyle' variant="top" src={item.volumeInfo.imageLinks?.thumbnail || "holder.js/100px180"} />
                    <Card.Body>
                        <Card.Title className='stileTitolo'>{item.volumeInfo.title}</Card.Title>
                        <Card.Text className='textTruncate'>
                            {item.volumeInfo.description ? item.volumeInfo.description : "Nessuna descrizione disponibile"}
                        </Card.Text>
                        <Link to={`/DetailedBookComponent/${item.id}`}><Card.Text className='goToPageStyle'>Vai alla pagina dettagliata</Card.Text></Link> 
                    </Card.Body>
                </Card>
            ))}
        </div>
            {/* Paginazione */}
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={(selectedItem) => setCurrentPage(selectedItem.selected + 1)}
                pageRangeDisplayed={4}
                pageCount={pageCount}
                forcePage={currentPage - 1}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                activeClassName="active"
            />

            
        </>
    );
}
export default MainComponent;
