package com.ims.server.item;

import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import java.util.List;
import java.util.ArrayList;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.ims.server.itemAction.ItemAction;

@Entity
@Data
@EntityListeners(AuditingEntityListener.class)
public class Item {
	@Id
	@GeneratedValue
	private Long id;

	@Column(nullable = false, unique = true)
	private final String code;

	@Column(nullable = false)
	private final String name;

	@Column(nullable = false)
	private final BigDecimal cost;

	@Column(nullable = false)
	private final BigDecimal price;

	@Column(nullable = false)
	private final Long quantity;

	@JsonIgnore
	@CreatedDate
	private LocalDateTime createdDate;

	@JsonIgnore
	@LastModifiedDate
	private LocalDateTime lastModifiedDate;

	@OneToMany(mappedBy = "item", cascade = CascadeType.ALL, orphanRemoval = true)
	private final List<ItemAction> itemActions = new ArrayList<>();

	Item() {
		this.code = "IMS-" + this.id;
		this.name = "IMS-Item";
		this.cost = BigDecimal.valueOf(0);
		this.price = BigDecimal.valueOf(0);
		this.quantity = 0L;
	}
}
