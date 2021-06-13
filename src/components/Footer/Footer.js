import styled from 'styled-components';

const Container = styled.footer`
  width: 100%;
`;

const FooterTop = styled.div`
  padding: 20px;
  background: #fefff8;
`;

const ResturantInfo = styled.p`
  color: #333;
  line-height: 2;
`;

const FooterBottom = styled.div`
  padding: 10px;
  background: #a3dea2;
  color: white;
  text-align: center;
`;

export default function Footer() {
  return (
    <Container>
      <FooterTop>
        <ResturantInfo>
          Address: Leamington Spa CV31 3PH <br />
          Contact us：01-1234-5678 <br />
          Opening hours：Tuesday ~ Sunday 11:00~22:00
          <br />
          email：shoroboo525@gmail.com
          <br />
        </ResturantInfo>
      </FooterTop>
      <FooterBottom>
        Copyright © 2021 Pei Rights Reserved. Restaurant project
      </FooterBottom>
    </Container>
  );
}