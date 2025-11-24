'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

type Product = {
  id: number
  name: string
  description?: string
  price: number
  image?: string
  category?: string
}

const fetchProducts = async (): Promise<Product[]> => {
  // Productos de ejemplo para pruebas frontend
  return [
    {
      id: 1,
      name: "Hamburguesa Clásica",
      description: "Carne 100% res, queso cheddar, lechuga y tomate.",
      price: 120,
      image: "/demo/hamburguesa.jpg",
      category: "main-dishes",
    },
    {
      id: 2,
      name: "Papas Fritas",
      description: "Porción grande de papas crujientes.",
      price: 45,
      image: "/demo/papas.jpg",
      category: "appetizers",
    },
    {
      id: 3,
      name: "Brownie con Helado",
      description: "Brownie de chocolate con bola de helado de vainilla.",
      price: 60,
      image: "/demo/brownie.jpg",
      category: "desserts",
    },
    {
      id: 4,
      name: "Limonada Natural",
      description: "Refrescante limonada hecha al momento.",
      price: 30,
      image: "/demo/limonada.jpg",
      category: "drinks",
    },
    {
      id: 5,
      name: "Pizza Margarita",
      description: "Salsa de tomate, mozzarella y albahaca fresca.",
      price: 150,
      image: "/demo/pizza.jpg",
      category: "main-dishes",
    },
  ];
}

export default function InteractiveMenu({
  onAdd,
  category,
}: {
  onAdd: (product: Product) => void
  category?: string
}) {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })

  const filtered = category && category !== "all"
    ? products?.filter((p: Product) => p.category === category)
    : products

  if (isLoading)
    return (
      <div className="text-center py-6 text-gray-500">
        Cargando productos...
      </div>
    )

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {filtered?.map((item: Product) => (
        <motion.div
          key={item.id}
          whileHover={{ scale: 1.03 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-background text-foreground">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">{item.name}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent className="relative p-0">
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.name}
                  className="aspect-video object-cover w-full h-56 rounded-b-2xl"
                  width={500}
                  height={500}
                />
              )}
              <div className="absolute bottom-3 right-3">
                <Button
                  variant="default"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => onAdd(item)}
                >
                  <PlusCircle className="h-4 w-4" /> Agregar
                </Button>
              </div>
              <div className="absolute bottom-3 left-3 font-bold text-sky-700 bg-white/80 px-2 py-1 rounded">
                ${item.price?.toFixed(2)}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
