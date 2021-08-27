import { React, useContext, useEffect} from 'react';
import { AuthContext } from '../../context';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import banner from '../../imgs/banner.jpg';
import { device } from '../../constants/devices';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';
import Aos from 'aos';
import "aos/dist/aos.css";

import '../../App.css';

import img1 from '../../imgs/menu_1.png';
import img2 from '../../imgs/menu_2.png';
import img3 from '../../imgs/menu_3.png';
import img4 from '../../imgs/menu_4.png';

import reviewer_1 from '../../imgs/reviewer_1.png';
import reviewer_2 from '../../imgs/reviewer_2.png';
import reviewer_3 from '../../imgs/reviewer_3.png';
import reviewer_4 from '../../imgs/reviewer_4.png';
import reviewer_5 from '../../imgs/reviewer_5.png';
import reviewer_6 from '../../imgs/reviewer_6.png';

SwiperCore.use([ Navigation, Pagination]);

const Root = styled.div`
    width: 100%;
    background: #fefff8;
`;

const SlideUp = keyframes`
    0% {
        opacity: 0;
        transform: translateY(250px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
`;

const Banner = styled.section`
    width: 100%;
    height: 800px;
    background: url(${banner}) no-repeat center/cover;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    h1 {
        position: absolute;
        z-index: 1;
        font-size: 100px;
        color: white;
        margin-left: 16px;
        font-family: 'Permanent Marker', cursive;
        animation: ${SlideUp} 2.1s ease;
    };

    &::after {
        content: '';
        background: rgba(0, 0, 0, 0.4);
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    };

    @media ${device.mobileXS} {
        h1 {
            font-size: 80px;
        }
    };

    @media ${device.mobileL} {
        h1 {
            font-size: 90px;
        }
    };
    @media ${device.tablet} {
        h1 {
            font-size: 100px;
            text-align: center;
        }
    };
`;

const MainBody = styled.main`
    display: flex;
    flex-direction: column;
`;

const Intro = styled.section`
    @media ${device.mobileXS} {
        display: flex;
        flex-direction: column;
        align-items: center;
    };
    @media ${device.laptop} {
        height: 600px;
    }
`;

const Title = styled.h2`
    margin-top: 80px;
    margin-bottom: 80px;
    border-left: 12px solid #a3dea2;
    border-radius: 8px;
    padding-left: 16px;
    font-size: 24px;
    font-family: 'Permanent Marker', cursive;
`;

const Description = styled.p`
    @media ${device.mobileXS} {
        width: 80%;
        padding: 10px 10px;
        line-height: 2;
    };
`;

const Action = styled(Link)`
    @media ${device.mobileXS} {
        width: 85%;
        height: 100px;
        padding: 26px;
        margin-top: 500px;
        background: #fece35;
        border-radius: 8px;
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        color: #fefff8;
        line-height: 1;
        transition: transform 0.5s;
        z-index: 1;
        animation: ${SlideUp} 2.5s ease;
    };

    @media ${device.mobileS} {
        padding: 26px;
    };

    @media ${device.mobileM} {
        line-height: 1.5;
    };

    @media ${device.tablet} {
        width: 60%;
        line-height: 2;
    };
    @media ${device.laptopL} {
        width: 30%;
        margin-top: 400px;
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
            width: 100%;
            height: 100%;
        };
    };

    @media ${device.tablet} {
        img {
            width: 50%;
            height: 50%;
        };
    };

    @media ${device.laptopL} {
        img {
            width: 25%;
            height: 25%;
        };
    };
`;

const DishImage = styled.img``;

const Reviews = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Reviewer = styled.div`
    width: 100%;
    height: 400px;
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
`;

const ReviewerImg = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
`;

const ReviwerInfo = styled.h6`
    &::after {
        content: '${(props) => props.$date}';
        padding-left: 20px;
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

    useEffect(() => {
        Aos.init({ duration: 3000 })
    }, [])

    return (
        <Root>
            <Banner>
                <h1>Vegan is new sexy</h1>
                <Action to={ user ? "/reserve" : "/login"}>Reserve my table today</Action>
            </Banner>
            <MainBody>
                <Intro>
                    <Title data-aos="fade-up">Who are we?</Title>
                    <Description data-aos="fade-up">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</Description>
                </Intro>
                <RecommendMenu>
                    <Title data-aos="fade-up">Chef's special</Title>
                    <ImageContainer data-aos="fade-up">
                        <DishImage src={img1} alt=""/>
                        <DishImage src={img2} alt=""/>
                        <DishImage src={img3} alt=""/>
                        <DishImage src={img4} alt=""/>
                    </ImageContainer>
                </RecommendMenu>

                <Reviews>
                    <Title data-aos="fade-up">What do people think of us</Title>
                    <Swiper
                    data-aos="fade-up" 
                    tag="section" 
                    wrapperTag="ul" 
                    navigation={{ clickable: true }} 
                    pagination={{ clickable: true }} 
                    spaceBetween={0} 
                    breakpoints={{
                        280: {width: 280, slidesPerView: 1},
                        768: {width: 768, slidesPerView: 2},
                        1024: {width: 1024, slidesPerView: 3},
                        1440: {width: 1440, slidesPerView: 3} 
                    }}>
                        <SwiperSlide key={1} tag="li">
                            <Reviewer>
                                <ReviewerImg src={reviewer_1} />
                                <ReviwerInfo $date="12/11">
                                    Sun Yat-Sen
                                </ReviwerInfo>
                                <ReviewerContent>This is the best vegan meal I have ever had in my life! I will highly recommend you to give it a try!
                                    This is the best vegan meal I have ever had in my life! I will highly recommend you to give it a try!
                                </ReviewerContent>
                            </Reviewer>
                        </SwiperSlide>

                        <SwiperSlide key={2} tag="li">
                            <Reviewer>
                                <ReviewerImg src={reviewer_2} />
                                <ReviwerInfo $date="23/4">
                                    Duckky
                                </ReviwerInfo>
                                <ReviewerContent>This is the best vegan meal I have ever had in my life! I will highly recommend you to give it a try!
                                    This is the best vegan meal I have ever had in my life! I will highly recommend you to give it a try!
                                </ReviewerContent>
                            </Reviewer>
                        </SwiperSlide>

                        <SwiperSlide key={3} tag="li">
                            <Reviewer>
                                <ReviewerImg src={reviewer_3} />
                                <ReviwerInfo $date="13/06">
                                    Frog knight
                                </ReviwerInfo>
                                <ReviewerContent>This is the best vegan meal I have ever had in my life! I will highly recommend you to give it a try!
                                    This is the best vegan meal I have ever had in my life! I will highly recommend you to give it a try!
                                </ReviewerContent>
                            </Reviewer>
                        </SwiperSlide>

                        <SwiperSlide key={4} tag="li">
                            <Reviewer>
                                <ReviewerImg src={reviewer_4} />
                                <ReviwerInfo $date="08/1">
                                    Pei
                                </ReviwerInfo>
                                <ReviewerContent>This is the best vegan meal I have ever had in my life! I will highly recommend you to give it a try!
                                    This is the best vegan meal I have ever had in my life! I will highly recommend you to give it a try!
                                </ReviewerContent>
                            </Reviewer>
                        </SwiperSlide>

                        <SwiperSlide key={5} tag="li">
                            <Reviewer>
                                <ReviewerImg src={reviewer_5} />
                                <ReviwerInfo $date="30/7">
                                    Jasmeow
                                </ReviwerInfo>
                                <ReviewerContent>This is the best vegan meal I have ever had in my life! I will highly recommend you to give it a try!
                                    This is the best vegan meal I have ever had in my life! I will highly recommend you to give it a try!
                                </ReviewerContent>
                            </Reviewer>
                        </SwiperSlide>

                        <SwiperSlide key={6} tag="li">
                            <Reviewer>
                                <ReviewerImg src={reviewer_6} />
                                <ReviwerInfo $date="14/10">
                                    Eggsabella
                                </ReviwerInfo>
                                <ReviewerContent>This is the best vegan meal I have ever had in my life! I will highly recommend you to give it a try!
                                    This is the best vegan meal I have ever had in my life! I will highly recommend you to give it a try!
                                </ReviewerContent>
                            </Reviewer>
                        </SwiperSlide>
                    </Swiper>
                </Reviews>

                <Location>
                    <Title data-aos="fade-up">Where are we</Title>
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