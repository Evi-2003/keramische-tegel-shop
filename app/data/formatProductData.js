export default function formatProductData(product){


    //const data = product.allPaAfmetingen.nodes
  
    const productForCart = [
        {
            name: product.name,
            description: product.shortDescription,
            id: atob(product.id),
            slug: product.slug,
            price: parseInt(product.price) * 100,
            //alt: product.image.altText,
            currency: 'EUR',
            image: product.image,
            //attributes: product.attributess[0]
        

        }
    ]

    return productForCart
}

/*
{
    "id": "cHJvZHVjdDo3Nzc=",
    "slug": "cera4line-mento-concrete-copy",
    "name": "Cera4line Mento Concrete 2",
    "type": "VARIABLE",
    "databaseId": 777,
    "shortDescription": "<p>Gebruiksgemak, verwerkingsvriendelijkheid en wonderschoon van uiterlijk. Drie belangrijke kenmerken voor de keramische lijn Cera4line Mento van Gardenlux. Als eerste in Nederland introduceert Gardenlux keramische tegels met een dikte van 4 cm.</p>\n",
    "image": {
        "id": "cG9zdDo3MDk=",
        "sourceUrl": "https://dev.webchange.nl/wp-content/uploads/2023/10/QNCM54568.GCERA_.jpg",
        "altText": ""
    },
    "onSale": false,
    "price": "€&nbsp;150,00 - €&nbsp;190,00",
    "content": "<p>Net als de serie Ceramica bestaat de serie Cera4line Mento uit keramische tegels, maar er zijn belangrijke verschillen. Waar de serie Ceramica massief keramisch is, zijn de tegels Cera4line Mento gemaakt op een body van 3 cm onderbeton met daarop verlijmd 1 cm dikke full body keramische tegels.</p>\n<p>&nbsp;</p>\n<p>De serie Cera4line Mento heeft de grote voordelen van keramisch zoals kleurechtheid en minder krasgevoelig dan beton of natuursteen, en de voordelen van beton als het gaat om de verwerking. De serie Cera4line Mento straat u gewoon in een goed zandbed van minimaal 10 cm dik. Tussen de tegels laat u een voegruimte van 5 mm, om randbeschadiging te voorkomen.</p>\n<p>Deze voeg kunt u afwerken met Gardenlux Sierbestratingsvoegmortel.</p>\n<h5>Fijn om te weten</h5>\n<p>Keramische buitentegels zijn niet meer weg te denken uit de Nederlandse tuinen. Deze tegels komen dan ook goed tot hun recht in zowel moderne als meer authentieke tuinen! De voordelen van keramische tegels:</p>\n<ul>\n<li>Kras- en kleurvast</li>\n<li>Niet glad dankzij een meegebakken anti-sliplaag</li>\n<li>Gemakkelijk in onderhoud en eenvoudig schoon te maken</li>\n<li>Minder snel groene aanslag, omdat vuil, vocht en algen geen grip hebben op het tegeloppervlak</li>\n</ul>\n<h5>Siertegels</h5>\n<p>Met siertegels kun je direct een geheel eigen sfeer en stijl creëren. Speels, chique, modern of kleurrijk. Voor ieder wat wils, dankzij geavanceerde printtechnieken. Grote mozaïekpatronen in diverse kleuren worden op betonnen of keramische tegels gedrukt. Ideaal om het zitgedeelte van het terras een extra touch te geven.</p>\n<p>&nbsp;</p>\n<h5>Belangrijk</h5>\n<p>Door fotografie kan de serie enigszins afwijken van de werkelijkheid. Elke keramische serie heeft zijn unieke print en design. Dit zorgt ervoor dat geen enkele serie hetzelfde is en daardoor de kleuren en prints kunnen afwijken. Wij raden aan de tegel daarom altijd in het echt te bekijken, voordat u een aankoop doet. Wij zijn niet aansprakelijk voor kleur- of printafwijkingen bij online aankopen.</p>\n",
    "regularPrice": "€&nbsp;150,00 - €&nbsp;190,00",
    "allPaAfmetingen": {
        "nodes": [
            {
                "name": "80 x 80 x 2cm",
                "variations": {
                    "edges": [
                        {
                            "node": {
                                "id": "cHJvZHVjdF92YXJpYXRpb246Nzgx",
                                "name": "Cera4line Mento Concrete 2 - 80 x 80 x 2cm",
                                "price": "€&nbsp;150,00",
                                "image": {
                                    "id": "cG9zdDo3MjU=",
                                    "sourceUrl": "https://dev.webchange.nl/wp-content/uploads/2023/10/QNCM55768.GCERA_1.jpg"
                                }
                            }
                        }
                    ]
                }
            },
            {
                "name": "80 x 80 x 3cm",
                "variations": {
                    "edges": [
                        {
                            "node": {
                                "id": "cHJvZHVjdF92YXJpYXRpb246Nzgy",
                                "name": "Cera4line Mento Concrete 2 - 80 x 80 x 3cm",
                                "price": "€&nbsp;190,00",
                                "image": {
                                    "id": "cG9zdDo2NTA=",
                                    "sourceUrl": "https://dev.webchange.nl/wp-content/uploads/2023/10/QNCM54723.GCERA_1.jpg"
                                }
                            }
                        }
                    ]
                }
            }
        ]
    },
    "allPaMinimaleHoeveelheidM2": {
        "nodes": [
            {
                "id": "dGVybTo1Nw==",
                "name": "0.64"
            }
        ]
    }
}
*/