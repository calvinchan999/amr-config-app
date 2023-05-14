import "./App.css";
import React, { useState, useEffect } from "react";
import { load } from "js-yaml";
import { ChakraProvider } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  Checkbox,
  Input,
  Stack,
  Text,
  Box,
} from "@chakra-ui/react";
import YmlForm from "./YmlForm";
// import chakraTheme from '@chakra-ui/theme'

// const { Button } = chakraTheme.components

// const theme = extendBaseTheme({
//   components: {
//     Button,
//   },
// })

function App() {
  const [yamlValue, setYamlValue] = useState(null);
  const [formElements, setFormElements] = useState([]);

  useEffect(() => {
    const getYaml = async () => {
      const response = await fetch("/amr-config/application.yml");
      const text = await response.text();
      setYamlValue(load(text));
    };
    getYaml();
  }, []);

  useEffect(() => {
    // const parseYamlToForm = (yamlObject, prefix = "") => {
    //   // console.log(yamlObject);
    //   if (!yamlObject) {
    //     return [];
    //   }
    //   console.log(yamlObject);
    //   const elements = Object.entries(yamlObject).map(([key, value]) => {
    //     console.table({ key, value });
    //     if (typeof value === "object" && !Array.isArray(value)) {
    //       return parseYamlToForm(value, `${prefix}${key}.`);
    //     } else if (typeof value === "string" || typeof value === "number") {
    //       return (
    //         <Form.Group controlId={`${prefix}${key}`}>
    //           <Form.Label>{key}</Form.Label>
    //           <Form.Control type="text" defaultValue={value} />
    //         </Form.Group>
    //       );
    //     } else if (Array.isArray(value)) {
    //       return (
    //         <Form.Group controlId={`${prefix}${key}`}>
    //           <Form.Label>{key}</Form.Label>
    //           <Form.Control type="text" defaultValue={value} />
    //           {/* <Form.Control as="select" multiple>
    //             {value.map((option, index) => (
    //               <option key={`${prefix}${key}-${index}`} value={option}>
    //                 {option}
    //               </option>
    //             ))}
    //           </Form.Control> */}
    //         </Form.Group>
    //       );
    //     } else if (typeof value === "boolean") {
    //       return (
    //         <Form.Group controlId={`${prefix}${key}`}>
    //           {/* <Form.Label>{key}</Form.Label> */}
    //           <Form.Check type="checkbox" label={key} defaultValue={value} />
    //         </Form.Group>
    //       );
    //     } else {
    //       return null;
    //     }
    //   });
    //   return elements;
    // };

    const parseYamlToForm = (yamlObject, prefix = "") => {
      if (!yamlObject) {
        return [];
      }
      const elements = Object.entries(yamlObject).map(([key, value]) => {
        console.log({ key, value, type: typeof value });
        if (typeof value === "object" && !Array.isArray(value)) {
          const nestedElements = parseYamlToForm(value, `${prefix}${key}.`);
          return (
            <Box key={`${prefix}${key}`}>
              <FormLabel>{key}:</FormLabel>
              {nestedElements}
            </Box>
          );
        } else if (typeof value === "string" || typeof value === "number") {
          return (
            <FormControl
              pl={10}
              key={`${prefix}${key}`}
              id={`${prefix}${key}`}
              backgroundColor={"transparent"}
            >
              <FormLabel>{key}</FormLabel>
              <Input type="text" defaultValue={value} />
            </FormControl>
          );
        } else if (Array.isArray(value)) {
          return (
            <FormControl
              pl={10}
              key={`${prefix}${key}`}
              id={`${prefix}${key}`}
              backgroundColor={"transparent"}
            >
              <FormLabel>{key}</FormLabel>
              <Input type="text" defaultValue={value} />
            </FormControl>
          );
        } else if (typeof value === "boolean") {
          return (
            <FormControl
              pl={10}
              key={`${prefix}${key}`}
              id={`${prefix}${key}`}
              backgroundColor={"transparent"}
            >
              <Checkbox defaultChecked={value}>{key}</Checkbox>
            </FormControl>
          );
        } else {
          return null;
        }
      });
      return elements;
    };

    if (yamlValue) {
      const elements = parseYamlToForm(yamlValue);
      setFormElements(elements);
    }
  }, [yamlValue]);

  return (
    <ChakraProvider>
      <div className="app-container">
        <div className="chakra-yml-form">
          <YmlForm html={formElements}></YmlForm>
        </div>
      </div>
    </ChakraProvider>
  );
}

export default App;
