import React from 'react';

interface Props {
    setSearchTerm: (term: string) => void;
}

const SearchBarComponent: React.FC<Props> = ({ setSearchTerm }) => {
    return (
        <input
            type="text"
            placeholder="Cerca libri..."
            
        />
    );
};

 </Form>
      <Form inline>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col xs="auto">
            <Button type="submit">Submit</Button>
          </Col>
        </Row>
      </Form>

export default SearchBarComponent;
