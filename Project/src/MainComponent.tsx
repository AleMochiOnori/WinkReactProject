import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import './MainComponent.css';
import SearchBarComponent from './SearchBarComponent';


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
    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=%7Bsearch`)
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
    }, []);

    if (error) {
        return <div className="error">Errore: {error}</div>;
    }

    if (!books) {
        return <div>Caricamento...</div>;
    }

    function filterTerm(term: string) {
        console.log(term);
            // Funzione per impostare il termine di ricerca
            fetch(`https://www.googleapis.com/books/v1/volumes?q=${term || 'book'}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Errore di rete o del server');
                    }
                    return response.json();
                })
                .then(data => {
                    setBooks(data); // Imposta i dati filtrati
                })
                .catch(error => {
                    console.error('Errore:', error);
                    setError(error.message);
                });

    }
        


    return (
        <>
        <SearchBarComponent setSearchTerm={filterTerm}/>
        <div className='mainContainer'>
            {books.items && books.items.map((item) => (
                <Card className='cardStyle' key={item.id}>
                    <Card.Img className='imgStyle' variant="top" src={item.volumeInfo.imageLinks?.thumbnail || "holder.js/100px180"} />
                    <Card.Body>
                        <Card.Title className='titleStyle'>{item.volumeInfo.title}</Card.Title>
                        <Card.Text className='textTruncate'>
                            {item.volumeInfo.description ? item.volumeInfo.description : "Nessuna descrizione disponibile"}
                        </Card.Text>
                     <Card.Link className='linkStyle' target='_blank' href={item.saleInfo.buyLink}>Acquista il libro</Card.Link>    
                    </Card.Body>
                </Card>
            ))}
        </div>
    </>
    );
}
export default MainComponent;
