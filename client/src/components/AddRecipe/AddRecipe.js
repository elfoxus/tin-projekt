import React, {useEffect, useState} from "react";
import Section from '../Section/Section';
import Avatar from "@mui/material/Avatar";
import {Typography, Container, Box, CircularProgress, Button, TextField, useTheme} from "@mui/material";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import MultiSelect from "./MultiSelect/MultiSelect";
import api from "../../services/api";
import NumberSelect from "./NumberSelect/NumberSelect";
import ChipEditList from "./ChipEditList/ChipEditList";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";



const AddRecipe = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    // global data
    const [categoriesList, setCategoriesList] = useState([]);
    const [tagsList, setTagsList] = useState([]);
    const [dishesList, setDishesList] = useState([]);
    // form state
    const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [invalidFields, setInvalidFields] = useState([]);
    // form fields
    const [name, setName] = useState('');
    const [time, setTime] = useState(dayjs('00:00', 'HH:mm'))
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState([]);
    const [dishes, setDishes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [servings, setServings] = useState(0);
    const [image, setImage] = useState(null);

    useEffect(() => {
        api.get('/categories')
            .then(res => {
                setCategoriesList(res.data);
            })
            .catch(err => console.log(err))
        api.get('/dishes')
            .then(res => {
                setDishesList(res.data);
            })
            .catch(err => console.log(err))
        api.get('/tags')
            .then(res => {
                setTagsList(res.data);
            })
            .catch(err => console.log(err))
    }, [])

    const handleDescriptionChange = (event) => {
        console.log(event.target.value)
        setDescription(event.target.value)
        let newInvalidFields = invalidFields.filter(field => field !== 'description');
        setInvalidFields(newInvalidFields);
        var enabled = event.target.value.length > 0
            && name.length > 0
            && ingredients.length > 0
            && steps.length > 0
            && dishes.length > 0
            && categories.length > 0
            && tags.length > 0
            && (servings > 0 && servings <= 10)
            && time > 0
            && newInvalidFields.length === 0
        console.log(enabled)
        setButtonDisabled(!enabled);
    }

    const handleNameChange = (event) => {
        console.log(event.target.value)
        setName(event.target.value)
        let newInvalidFields = invalidFields.filter(field => field !== 'name');
        setInvalidFields(newInvalidFields);
        var enabled = event.target.value.length > 0
            && description.length > 0
            && ingredients.length > 0
            && steps.length > 0
            && dishes.length > 0
            && categories.length > 0
            && tags.length > 0
            && (servings > 0 && servings <= 10)
            && time > 0
            && newInvalidFields.length === 0
        setButtonDisabled(!enabled);
    }

    const onCategoriesChange = (event, values) => {
        console.log(values)
        setCategories(values)
        let newInvalidFields = invalidFields.filter(field => field !== 'categories');
        setInvalidFields(newInvalidFields);
        var enabled = values.length > 0
            && description.length > 0
            && ingredients.length > 0
            && steps.length > 0
            && dishes.length > 0
            && name.length > 0
            && tags.length > 0
            && (servings > 0 && servings <= 10)
            && time > 0
            && newInvalidFields.length === 0
        setButtonDisabled(!enabled);
    }

    const onDishesChange = (event, values) => {
        console.log(values)
        setDishes(values)
        let newInvalidFields = invalidFields.filter(field => field !== 'dishes');
        setInvalidFields(newInvalidFields);
        var enabled = values.length > 0
            && description.length > 0
            && ingredients.length > 0
            && steps.length > 0
            && name.length > 0
            && categories.length > 0
            && tags.length > 0
            && (servings > 0 && servings <= 10)
            && time > 0
            && newInvalidFields.length === 0
        setButtonDisabled(!enabled);
    }

    const onTagsChange = (event, values) => {
        console.log(values)
        setTags(values)
        let newInvalidFields = invalidFields.filter(field => field !== 'name');
        setInvalidFields(newInvalidFields);
        var enabled = values.length > 0
            && description.length > 0
            && ingredients.length > 0
            && steps.length > 0
            && dishes.length > 0
            && categories.length > 0
            && name.length > 0
            && (servings > 0 && servings <= 10)
            && time > 0
            && newInvalidFields.length === 0
        setButtonDisabled(!enabled);
    }

    const onServingsChange = (value) => {
        console.log(value)
        setServings(value)
        let newInvalidFields = invalidFields.filter(field => field !== 'name');
        setInvalidFields(newInvalidFields);
        var enabled = (value > 0 && value <= 10)
            && description.length > 0
            && ingredients.length > 0
            && steps.length > 0
            && dishes.length > 0
            && categories.length > 0
            && tags.length > 0
            && name.length > 0
            && time > 0
            && newInvalidFields.length === 0
        setButtonDisabled(!enabled);
    }

    const onTimeChange = (value) => {
        console.log(value)
        setTime(value)
        let newInvalidFields = invalidFields.filter(field => field !== 'name');
        setInvalidFields(newInvalidFields);
        var enabled = value > 0
            && description.length > 0
            && ingredients.length > 0
            && steps.length > 0
            && dishes.length > 0
            && categories.length > 0
            && tags.length > 0
            && (servings > 0 && servings <= 10)
            && name.length > 0
            && newInvalidFields.length === 0
        setButtonDisabled(!enabled);
    }

    const onImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log(file)
            setImage(file);
        }
        let newInvalidFields = invalidFields.filter(field => field !== 'image');
        setInvalidFields(newInvalidFields);
        var enabled = file
            && description.length > 0
            && ingredients.length > 0
            && steps.length > 0
            && dishes.length > 0
            && categories.length > 0
            && tags.length > 0
            && (servings > 0 && servings <= 10)
            && time > 0
            && newInvalidFields.length === 0
        setButtonDisabled(!enabled);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        const hours = time.$H > 10 ? time.$H : '0' + time.$H;
        const minutes = time.$m > 10 ? time.$m : '0' + time.$m;
        const dataToSend = {
            name: name,
            description: description,
            ingredients: ingredients.map(ingredient => ingredient.text),
            steps: steps.map((step, index) => {
                return {
                    number: index + 1,
                    name: step.text
                }
            }),
            dishes: dishes,
            categories: categories,
            tags: tags,
            servings: servings,
            time: hours + ':' + minutes,
            image: image
        }

        api.post('/recipes', dataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            console.log(res.data.message)
            setLoading(false)
            navigate('/recipes/' + res.data.recipeId)

        }).catch(err => {
            console.log(err)
            if (err.response && err.response.data && err.response.data.message) {
                console.log(err.response.data.message)
            }
            setLoading(false)
        })

    };



    const theme = useTheme();

    return (
        <Section>
            <Container
                       sx={{
                           display: 'flex',
                           flexDirection: 'column',
                           alignItems: 'center',
                           width: '100%',
                           gap: {
                               xs: 2,
                               md: 0
                           },
                           maxWidth: {
                               md: theme.breakpoints.values['md'],
                               sm: theme.breakpoints.values['sm']
                           }
                       }}
            >
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: {xs: 'column', md: 'row'},
                    gap: {
                        xs: 2,
                        md: 0
                    },
                    width: '100%',
                    justifyContent: image ? 'space-between' : 'center',
                    '& > *': {
                        width: {
                            xs: '100%',
                            md: 'calc(50% - 8px)',
                        }
                    }
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <Avatar sx={{ m: 1, backgroundColor: 'secondary.main' }}>
                            <AddOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            {t('add-recipe.title')}
                        </Typography>
                    </Box>
                    {image &&
                        <Box
                            component="img"
                            src={URL.createObjectURL(image)}
                            alt={t('add-recipe.image-alt')}
                            sx={{
                                height: 'auto',
                            }}
                        />
                    }
                </Box>
                <Box component="form"
                     onSubmit={handleSubmit}
                     noValidate
                     sx={{
                         width: '100%',
                         display: 'flex',
                         flexDirection: 'column',
                         gap: 2
                     }}
                     >
                    <Box sx={{
                        mt: 1,
                        display: 'flex',
                        flexDirection: {xs: 'column', md: 'row'},
                        width: '100%',
                        gap: 2,
                        '& > *': {
                            width: {
                                md: '50%',
                                xs: '100%'
                            }
                        }
                    }}>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                            <TextField
                                disabled={loading}
                                value={name}
                                id="name"
                                label={t('add-recipe.form.name')}
                                placeholder={t('add-recipe.form.name-placeholder')}
                                fullWidth
                                onChange={handleNameChange}
                            />
                            <Button
                                variant="contained"
                                component="label"
                            >
                                {t('add-recipe.form.add-image')}
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={onImageChange}
                                />
                            </Button>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker value={time} onChange={onTimeChange} views={['hours', 'minutes']} label={t('add-recipe.form.cooking-time')} format="HH:mm" ampm={false}/>
                            </LocalizationProvider>
                            <NumberSelect
                                disabledProp={loading}
                                idProp="servings"
                                label={t('add-recipe.form.servings')}
                                placeholder="Podaj ilość porcji"
                                min={1}
                                max={10}
                                value={servings}
                                onChange={onServingsChange}
                            />
                            <MultiSelect
                                idProp="categories"
                                onChange={onCategoriesChange}
                                options={categoriesList}
                                disabledProp={loading}
                                label={t('add-recipe.form.categories')}
                                placeholder={t('add-recipe.form.categories-placeholder')}
                            />
                            <MultiSelect
                                idProp="dishes"
                                onChange={onDishesChange}
                                options={dishesList}
                                disabledProp={loading}
                                label={t('add-recipe.form.dishes')}
                                placeholder={t('add-recipe.form.dishes-placeholder')}
                            />
                            <MultiSelect
                                idProp="tags"
                                onChange={onTagsChange}
                                options={tagsList}
                                disabledProp={loading}
                                label={t('add-recipe.form.tags')}
                                placeholder={t('add-recipe.form.tags-placeholder')}
                            />
                            <TextField
                                disabled={loading}
                                value={description}
                                id="description"
                                label={t('add-recipe.form.description')}
                                placeholder={t('add-recipe.form.description-placeholder')}
                                multiline
                                fullWidth
                                rows={4}
                                onChange={handleDescriptionChange}
                            />
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                            <ChipEditList
                                title={t('add-recipe.form.ingredients')}
                                placeholder={t('add-recipe.form.ingredients-placeholder')}
                                values={ingredients}
                                setValues={setIngredients}
                                indexes={false}
                            />
                            <ChipEditList
                                title={t('add-recipe.form.steps')}
                                placeholder={t('add-recipe.form.steps-placeholder')}
                                values={steps}
                                setValues={setSteps}
                                indexes={true}
                            />
                        </Box>
                    </Box>
                    <Button
                        type="submit"
                        variant="contained"
                        endIcon={<AddOutlinedIcon />}
                        disabled={buttonDisabled || loading}
                        sx={{
                            alignSelf: 'center',
                            mt: {
                                xs: 0,
                                md: 'auto'
                            },
                            width: {
                                md: '50%',
                                xs: '100%'
                            }
                        }}
                    >
                        {t('add-recipe.form.submit')}
                        {loading && (
                            <CircularProgress
                                size={24}
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    marginTop: '-12px',
                                    marginLeft: '-12px',
                                }}
                            />
                        )}
                    </Button>
                </Box>
            </Container>
        </Section>
    )
}

export default AddRecipe;