import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Table,
    TableContainer,
    Tbody,
    Td,
    Tr,
} from "@chakra-ui/react";
import './CategoryDetailView.css';


function CategoryDetailView(){

    const dispatch = useDispatch();
    let params = useParams();


    useEffect(() => {

        if(!categoryDetails){
            console.log('hello');
        }else{
            console.log('hi');
        }
        dispatch({
            type: 'FETCH_CATEGORY_DETAIL',
            payload: {
                catId: params.catId,
                ageId: params.ageId
            }
        })
    },);

    let categoryDetails = useSelector((store)=>{
        return store.categoryDetail;
    })
    console.log('categorydetails is', categoryDetails);

    let specificresources = useSelector((store)=>{
        return store.specificresources;
    })
    console.log('specific resources is', specificresources);

    
    return(
    <>
    <div className="accordion">
        <Accordion allowToggle>
                        <AccordionItem>
                            <h2>
                                <AccordionButton style={{height: 50, borderRadius: 8, backgroundColor: '#8EBBA7'}}>
                                    <Box flex ='1' textAlign='center'>
                                        Guidelines
                                    </Box>
                                   
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                            <TableContainer maxHeight="200vh" overflowY='scroll'>
                                     <Table variant='simple' size='sm'>
                                         <Tbody>
                                             {categoryDetails && categoryDetails.guidelines.map((guideline) => (
                                                 <Tr key={guideline.id}>
                                                     <Td>{guideline.name}</Td>
                                                      <Td>{guideline.info}</Td>
                                                     <Td>{guideline.grade}</Td>
                                                     <Td>{guideline.date}</Td> 
                                                 </Tr>
                                             )
                                            )
                                         }
                                          </Tbody>
                                     </Table>
 
                                 </TableContainer> 
                            </AccordionPanel>
                        </AccordionItem>
            <AccordionItem>
                            <h2>
                                <AccordionButton style={{height: 50, borderRadius: 8, backgroundColor: '#8EBBA7'}}>
                                    <Box flex='1' textAlign='center'>
                                        Diagnostic Tools
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <Box maxHeight="30vh" overflowY='scroll'>
                                  render tools here

                                </Box>
                            </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
                            <h2>
                                <AccordionButton style={{height: 50, borderRadius: 8, backgroundColor: '#8EBBA7'}}>
                                    <Box flex='1' textAlign='center'>
                                        FAQs
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <Box maxHeight="30vh" overflowY='scroll'>
                                  render FAQs

                                </Box>
                            </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
                            <h2>
                                <AccordionButton style={{height: 50, borderRadius: 8, backgroundColor: '#8EBBA7'}}>
                                    <Box flex='1' textAlign='center'>
                                        Questions to Ask your Doctor
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <Box maxHeight="30vh" overflowY='scroll'>
                                  render questions here

                                </Box>
                            </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
                            <h2>
                                <AccordionButton style={{height: 50, borderRadius: 8, backgroundColor: '#8EBBA7'}}>
                                    <Box flex='1' textAlign='center'>
                                        Specific resources
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <Box maxHeight="30vh" overflowY='scroll'>
                                  render specific resources here

                                </Box>
                            </AccordionPanel>
            </AccordionItem>
            </Accordion>
            </div>
           
        
        
    </>
    );
}


export default CategoryDetailView;