import { useEffect, useRef, useState } from "react";

export function Observer(options = {}){
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current

        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                //Se o elemento estiver visível
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                threshold: 0.1, //10 por cento do elemento precisa estar visível
            }
        )

        //observar o elemento
        observer.observe(element);
        
        //limpar observer  componente desmontar
        return () => {
            observer.disconnect()
        }
    }, [])

    return [ref, isVisible];
}