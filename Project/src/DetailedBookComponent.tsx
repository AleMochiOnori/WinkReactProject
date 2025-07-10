import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './DetailedBookContainer.css';



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


    
const DetailedBookComponent = () => {
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<Item | null>(null);
    const [error, setError] = useState<string | null>(null);
     useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Errore di rete o del server');
                }
                return response.json();
            })
            .then(data => {
                setBook(data); 
            })
            .catch(error => {
                console.error('Errore:', error);
                setError(error.message);
            });
    }, [id]);



    if (error) return <div>Errore: {error}</div>;
    if (!book) return <div>Caricamento...</div>;
    

  return (
   <>
    <div className="detailed-book-container">
        <div className='top-content'>
            <div className='left-content'>
                {book.volumeInfo.imageLinks?.thumbnail ? (
                <img
                    src={book.volumeInfo.imageLinks.thumbnail}
                className="ImageStyle"
                />
                ) : (
                <p>Nessuna immagine disponibile</p>
                )}
            </div>
        <div className='right-content'>
            <h1 className='titleStyle'>{book?.volumeInfo.title}</h1>
        </div>
        </div>
        <div className='bottom-content'>
            <p className='authorStyle'>Scritto da :  {book?.volumeInfo.authors}</p>
            <p className='descriptionStyle' dangerouslySetInnerHTML={{__html: book?.volumeInfo.description}}/>
            <p className='publishStyle'>Pubblicato nel {book?.volumeInfo.publishedDate}</p>
            {book.saleInfo?.buyLink ? (
                <a  className="buyStyle" href={book.saleInfo.buyLink} target="_blank" rel="noopener noreferrer">
                    Acquista il libro!!
                </a>
                ) : (
                <p>Non disponibile per l'acquisto</p>
            )}
        </div>
    </div>
   </>
  )
}

export default DetailedBookComponent;