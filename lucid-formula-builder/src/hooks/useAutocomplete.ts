import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface Suggestion {
    label: string;
    value: string;
}


export function useAutocomplete(query: string) {
    return useQuery({
        queryKey: ['autocomplete', query],
        queryFn: async () => {
            if (!query) return [];

            const response = await axios.get('https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete');

            const filtered = response.data.filter((item) =>
                item.name.toLowerCase().includes(query.toLowerCase()) ||
                item.category.toLowerCase().includes(query.toLowerCase())
            );


            return filtered.map((item) => ({
                label: item.name,
                value: item.value,
                id: item.id,
            }));
        },
        enabled: !!query,
    });

}

