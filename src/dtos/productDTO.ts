export type productDTO = {
  name: string;
  description: string;
  price: number;
  is_new: boolean;
  accept_trade: boolean;
  payment_methods: methods[];
};

type methods = "pix" | "card" | "boleto" | "cash" | "deposit";
