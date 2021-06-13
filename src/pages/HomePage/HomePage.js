import { React, useContext } from 'react';
import { AuthContext } from '../../context';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import banner from '../../imgs/banner.jpg';
import { device } from '../../constants/devices';
import img1 from '../../imgs/menu_1.png';
import img2 from '../../imgs/menu_2.png';
import img3 from '../../imgs/menu_3.png';
import img4 from '../../imgs/menu_4.png';

import reviewer_1 from '../../imgs/reviewer_1.png';
import reviewer_2 from '../../imgs/reviewer_2.png';
import reviewer_3 from '../../imgs/reviewer_3.png';

const Root = styled.div`
    width: 100%;
    background: #fefff8;
`;

const Banner = styled.section`
    width: 100%;
    height: 600px;
    background: url(${banner}) no-repeat center/cover;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    h1 {
        position: absolute;
        z-index: 1;
        font-size: 60px;
        color: white;
        margin-left: 16px;
    }

    &::after {
        content: '';
        background: rgba(0, 0, 0, 0.4);
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
`;

const MainBody = styled.main`
    display: flex;
    flex-direction: column;
`;

const Intro = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.h2`
    margin-top: 80px;
    margin-bottom: 20px;
    border-left: 12px solid #a3dea2;
    padding-left: 16px;
    font-size: 24px;
`;

const Description = styled.p`
    @media ${device.mobileXS} {
        width: 86%;
        padding: 10px 10px;
        line-height: 2;
    };
    @media ${device.laptop} {
        width: 80%;
    };
`;

const Action = styled(Link)`
    @media ${device.mobileXS} {
        width: 260px;
        height: 100px;
        background: #fece35;
        margin: 0 auto;
        border-radius: 8px;
        padding: 32px;
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        color: #fefff8;
        line-height: 1;
        transition: transform 0.5s;
    };
    @media ${device.mobileM} {
        width: 360px;
    };

    &:hover {
        color: #fefff8;
        text-decoration: none;
        transform: scale(1.1);
    };
`;

const RecommendMenu = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ImageContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    @media ${device.mobileXS} {
        img {
            width: 270px;
            height: 270px;
        };
    };
    @media ${device.laptop} {
        img {
            width: 356px;
            height: 356px;
        };
    };
`;

const Reviews = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Reviewer = styled.div`
    width: 80%;
    height: 250px;
    border: solid 1px #c7e5ec;
    box-shadow: -1.4px -1.4px 4px 0 #a3dea2;
    border-radius: 8px;
    padding: 20px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: scroll;
    position: relative;

    ::-webkit-scrollbar {
        width: 0px;
        background: transparent;
    }

    & + & {
        margin-top: 20px;
    };
`;

const ReviewerImg = styled.div`
    width: 100px;
    height: 100px;
    background: url(${(props) => props.$img}) no-repeat;
    border-radius: 50%;
`;

const ReviwerInfo = styled.h6`
    &::after {
        content: '${(props) => props.$date}';
        padding-left: 10px;
        color: green;
    };
`;

const ReviewerContent = styled.p`
    padding: 20px;
    position: absolute;
    top: 140px;
`;

const Location = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export default function HomePage() {
    const { user } = useContext(AuthContext);

    return (
        <Root>
            <Banner>
                <h1>Vegan is new sexy</h1>
            </Banner>
            <MainBody>
                <Intro>
                    <Title>This is intro</Title>
                    <Description>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</Description>
                </Intro>
                <Action to={ user ? "/reserve" : "/login"}>Reserve my table today</Action>
                <RecommendMenu>
                    <Title>Chef's special</Title>
                    <ImageContainer>
                        <img src={img1} alt=""/>
                        <img src={img2} alt=""/>
                        <img src={img3} alt=""/>
                        <img src={img4} alt=""/>
                    </ImageContainer>
                </RecommendMenu>
                <Reviews>
                    <Title>What do people think of us</Title>
                    <Reviewer>
                        <ReviewerImg $img={reviewer_1} />
                        <ReviwerInfo $date="13/06">
                            Tom
                        </ReviwerInfo>
                        <ReviewerContent>This is the best vegan meal I have ever had in my life! I will highly recommend you to give it a try!
                            This is the best vegan meal I have ever had in my life! I will highly recommend you to give it a try!
                            This is the best vegan meal I have ever had in my life! I will highly recommend you to give it a try!
                            This is the best vegan meal I have ever had in my life! I will highly recommend you to give it a try!
                        </ReviewerContent>
                    </Reviewer>
                    <Reviewer>
                        <ReviewerImg $img={reviewer_2} />
                        <ReviwerInfo $date="13/06">
                            Federico
                        </ReviwerInfo>
                        <ReviewerContent>This is the best vegan meal I have ever had in my life! I will highly recommend you to give it a try!
                            This is the best vegan meal I have ever had in my life! I will highly recommend you to give it a try!
                        </ReviewerContent>
                    </Reviewer>
                    <Reviewer>
                        <ReviewerImg $img={reviewer_3} />
                        <ReviwerInfo $date="13/06">
                            Jasmin
                        </ReviwerInfo>
                        <ReviewerContent>This is the best vegan meal I have ever had in my life! I will highly recommend you to give it a try!
                            This is the best vegan meal I have ever had in my life! I will highly recommend you to give it a try!
                        </ReviewerContent>
                    </Reviewer>
                </Reviews>
                <Location>
                    <Title>Where are we</Title>
                    <iframe title="ourlocation" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2440.562678993525!2d-1.537378853054072!3d52.28764098356889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487734ecb5625cad%3A0xd97b1b78e86fbb72!2z55qH5a625Yip5piO6aCT56Sm5rOJ5biC55qH5a625Yip5piO6aCT5rqr5rOJ6YKu5pS_57yW56CBOiBDVjMyIDVBQQ!5e0!3m2!1szh-TW!2suk!4v1618312658092!5m2!1szh-TW!2suk" 
                    allowFullScreen="" 
                    loading="lazy" 
                    style={{width: '100%', height: '450px', border: '0'}}>
                    </iframe>
                </Location>
            </MainBody>
        </Root>
    )
}