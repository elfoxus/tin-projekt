import React from "react";
import Section from "../Section/Section";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {useTranslation} from "react-i18next";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const AboutUs = () => {

    const { t } = useTranslation();


    return (
        <Section title={t('about-us.title')}>
            <Stack divider={<Divider orientation="horizontal" flexItem />} direction="column" gap={2} sx={{paddingLeft: 1}}>
                <Typography variant={"body1"}>{t('about-us.p1')}</Typography>
                <Typography variant={"body1"}>{t('about-us.p2')}</Typography>
                <Typography variant={"body1"}>{t('about-us.p3')}</Typography>
                <Typography variant={"body1"}>{t('about-us.p4')}</Typography>
                <Stack  direction="column" gap={1}>
                    <Typography variant={"body1"}>{t('about-us.p5')}</Typography>
                    {[1,2,3].map((dot) =>
                        <Box sx={{display:'flex', gap: 1, alignItems: 'center', flexDirection: 'center'}}>
                            <ArrowRightIcon size="small"/>
                            <Typography sx={{marginLeft: 2}} variant={"body1"} key={dot}>{t('about-us.dot' + (dot))}</Typography>
                        </Box>
                    )}
                </Stack>
            </Stack>
        </Section>
    )
}

export default AboutUs;