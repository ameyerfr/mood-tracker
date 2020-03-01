import React from 'react';
import Keywords from "./Keywords";
 
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
 
// Demo styles, see 'Styles' section below for some notes on use.
// import 'react-accessible-accordion/dist/fancy-example.css';
 
export default function Collapse() {
    return (
        <Accordion allowZeroExpanded="true">
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        What made you feel positive today?
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <Keywords
                        title="positive"
                    />
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        What made you feel negative today?
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <Keywords 
                        title="negative"
                    />
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>
    );
}